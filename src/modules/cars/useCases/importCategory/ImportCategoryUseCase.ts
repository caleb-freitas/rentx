import csvParse from 'csv-parse';
import fs from 'fs';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

interface IImportCategory {
  name: string;
  description: string;
}

class ImportCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const categories: IImportCategory[] = [];

      // separate the file into chunks
      const stream = fs.createReadStream(file.path);

      // read documentation
      const parseFile = csvParse();

      // send the chunck to parseFile
      stream.pipe(parseFile);

      // read documentation
      parseFile
        .on('data', async line => {
          const [name, description] = line;
          categories.push({ name, description });
        })
        .on('end', () => {
          resolve(categories);
        })
        .on('error', err => {
          reject(err);
        });
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);
    categories.map(async category => {
      const { name, description } = category;
      const categoryAlreadyExists = this.categoriesRepository.findByName(name);

      if (!categoryAlreadyExists) {
        this.categoriesRepository.create({
          name,
          description
        });
      }
    });
  }
}
export { ImportCategoryUseCase };
