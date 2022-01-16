import { JobsSector } from './dto/create-jobs-sector.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProjectSize } from './dto/create-project-size.dto';
import { Product, ProductDocument } from './schemas/product.schema';
import { UpdateProductDto } from './dto/update-product.dto';
import { readFile } from 'fs/promises';
import { randomBytes } from 'crypto';
import { Product3, ProductDocument3 } from './schemas/product.schema2';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    @InjectModel(Product3.name) private productModel2: Model<ProductDocument3>,
  ) {}

  uploadDataToDataBase = async(data: any) => {
    const newProduct = new this.productModel2(data);
    console.log(newProduct);
    return newProduct.save();
  }

  sortFile = (file) => {
    return { ['file']: { $exists: file === 'true' ? true : false } };
  };
  sortWorkfoces = (meaning) => {
    if (meaning === "false") {
      return { ['workforces']: { $exists: true, $size: 0 } };
    } else
    return { ['workforces']: { $exists: true, $not: {$size: 0} } };
  };
  sortName = (nameSort, meaning) => {
    return { [nameSort]: meaning };
  };

  async getCount(page, move?, file?, nameSort?, meaning?) {
    let countElements;
    let currentPage;
    let status;

    if (file || nameSort) {
      if (nameSort === "workforces") {
        await this.productModel.find(
          this.sortWorkfoces(meaning)
        ).countDocuments()
        .then(data => countElements = data)
        .catch(err => {status = `something went wrong - ${err}`})

        await this.productModel
        .find(this.sortWorkfoces(meaning))
        .sort(move === 'old' ? { _id: 1 } : { _id: -1 })
        .skip(page * 10)
        .limit(10)
        .then((data) => currentPage = data)
        .catch(err => {status = `something went wrong - ${err}`})
      } else {
        await this.productModel.find(
          file
            ? this.sortFile(file)
            : nameSort
            ? this.sortName(nameSort, meaning)
            : null,
        ).countDocuments()
        .then(data => countElements = data)
        .catch(err => {status = `something went wrong - ${err}`})
        await this.productModel
        .find(
          file
            ? this.sortFile(file)
            : nameSort
            ? this.sortName(nameSort, meaning)
            : null,
        )
        .sort(move === 'old' ? { _id: 1 } : { _id: -1 })
        .skip(page * 10)
        .limit(10)
        .then((data) => (currentPage = data))
        .catch(err => {status = `something went wrong - ${err}`})
      }
    } else {
      await this.productModel.collection
      .countDocuments(file ? {$file: {}} : nameSort ? {nameSort: meaning} : null)
      .then((data) => (countElements = data))
      .catch(err => {status = `something went wrong - ${err}`})
      await this.productModel
      .find(
        file
          ? this.sortFile(file)
          : nameSort
          ? this.sortName(nameSort, meaning)
          : null,
      )
      .sort(move === 'old' ? { _id: 1 } : { _id: -1 })
      .skip(page * 10)
      .limit(10)
      .then((data) => (currentPage = data))
      .catch(err => {status = `something went wrong - ${err}`})
    }

    return {
      count: countElements,
      page: currentPage,
      status: status
    };
  }

  async createHavework(body: ProjectSize): Promise<string | Product> {
    try {
      const workforces = JSON.parse(body.workforce);
      const data = JSON.parse(body.data);
      const dataFinal = {
        projectSize: body.projectSize,
        data: { ...data },
        workforces: [...workforces],
        dateCreated: body.dateCreated,
        projectName: body.projectName.trim(),
        projectCity: body.projectCity.trim(),
        projectProvince: body.projectProvince.trim(),
      };
      const newProduct = new this.productModel(dataFinal);
      return newProduct.save();
    } catch (err) {
      return `something went wrong - ${err}`;
    }
  }

  async createGetWork(body: JobsSector, file): Promise<string | Product> {
    try {
      const jobSector = body.jobSector;
      const dateCreated = body.dateCreated;
      const selectedJobs = JSON.parse(body.selectedJobs);
      const data = JSON.parse(body.data);
      if (file) {
        const dataFinal = {
          jobSector: jobSector,
          data: { ...data },
          selectedJobs: [...selectedJobs],
          file: {
            ...file,
            originalname: `${randomBytes(4).toString('hex')}_${file.originalname}`,
          },
          dateCreated: dateCreated,
        };
        const newProduct = new this.productModel(dataFinal);
        return newProduct.save();
      } else {
        const dataFinal = {
          jobSector: jobSector,
          data: { ...data },
          selectedJobs: [...selectedJobs],
          dateCreated: dateCreated,
        };
        const newProduct = new this.productModel(dataFinal);
        return newProduct.save();
      }
    } catch (err) {
      return `something went wrong - ${err}`;
    }
  }

  async remove(id: string): Promise<string | Product> {
    try {
      return this.productModel.findByIdAndRemove(id);
    } catch (err) {
      return `something went wrong - ${err}`;
    }
  }

  async getAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async getById(id: string): Promise<Product> {
    return this.productModel.findById(id);
  }

  async update(id: string, productDto: UpdateProductDto): Promise<Product> {
    return this.productModel.findByIdAndUpdate(id, productDto, { new: true });
  }
}
