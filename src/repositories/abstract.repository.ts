import {
  FilterQuery,
  Model,
  Types,
  UpdateQuery,
  Document,
  SaveOptions,
} from 'mongoose';

type SortOrder = 1 | -1;


export abstract class AbstractRepository<TDocument extends Document> {

  constructor(
    protected readonly model: Model<TDocument>,
  ) {}

async create(
    document: Omit<TDocument, '_id'>,
    options?: SaveOptions,
): Promise<TDocument> {
    const createdDocument = new this.model({
        ...document,
        _id: new Types.ObjectId(),
    }) as TDocument; // Typecast the created document to TDocument
    return createdDocument.save(options);
}

async findOne(filterQuery: FilterQuery<TDocument>, select?: object): Promise<TDocument | null> {
    const document = await this.model.findOne(filterQuery, select , { lean: true });
    if (!document) {
        console.log('Document not found', { filterQuery });
        // Optionally throw an error here if you prefer
    }
    return document as TDocument | null;
}

async findById(id: string, select?: object): Promise<TDocument | null> {
    const document = await this.model.findById(id, select, { lean: true });
    if (!document) {
        console.log('Document not found with ID:', id);
        // Optionally throw an error here if you prefer
    }
    return document as TDocument | null;
}

  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
    options: { new: boolean; upsert?: boolean } = { new: true }
  ): Promise<TDocument | null> {
    const document = await this.model.findOneAndUpdate(filterQuery, update, options);
    if (!document) {
      console.log('Failed to update document', { filterQuery });
      // Optionally throw an error here if you prefer
    }
    return document;
  }

  async find(
    filterQuery: FilterQuery<TDocument>,
    options: {
      page?: number;
      limit?: number;
      sort?: { [key: string]: SortOrder | { $meta: any } };
      select?: any;
    } = {}
  ): Promise<{
    documents: TDocument[];
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  }> {
    const { page = 1, limit = 10, sort = { _id: -1 }, select = {} } = options;
    const skip = (page - 1) * limit;
    const total = await this.model.countDocuments(filterQuery);
    const documents = await this.model
        .find(filterQuery, select, { lean: true })
        .sort(sort as { [key: string]: SortOrder | { $meta: any; }; }) // Fix the type of the sort parameter
        .skip(skip)
        .limit(limit) as TDocument[];

    const totalPages = Math.ceil(total / limit); // Declare and initialize totalPages variable

    return {
        documents,
        page,
        limit,
        total,
        totalPages,
    };
  }

  async count(filterQuery: FilterQuery<TDocument>): Promise<number> {
    return this.model.countDocuments(filterQuery);
  };

  // Aggregation
  async aggregate(pipeline: any[]): Promise<any[]> {
    return this.model.aggregate(pipeline);
  };
}
