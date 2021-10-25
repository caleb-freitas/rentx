import csvParse from 'csv-parse';
import fs from 'fs';

class ImportCategoryUseCase {
  execute(file: Express.Multer.File): void {
    // separate the file into chunks
    const stream = fs.createReadStream(file.path);

    // read documentation
    const parseFile = csvParse();

    // send the chunck to parseFile
    stream.pipe(parseFile);

    // read documentation
    parseFile.on('data', async line => {
      console.log(line);
    });
  }
}

export { ImportCategoryUseCase };
