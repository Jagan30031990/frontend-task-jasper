import { ObjectId } from 'mongodb';
import { connectDB } from '@/utils/db';

export default async function handler(req, res) {
  const db = await connectDB();
  const collection = db.collection('products');
  const { id } = req.query;

  switch (req.method) {
    case 'GET':
      const product = await collection.findOne({ _id: new ObjectId(id) });
      if (!product) return res.status(404).json({ error: 'Not found' });
      res.status(200).json(product);
      break;
    case 'PUT':
      await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: req.body }
      );
      res.status(200).json({ message: 'Updated' });
      break;
    case 'DELETE':
      await collection.deleteOne({ _id: new ObjectId(id) });
      res.status(200).json({ message: 'Deleted' });
      break;
  }
}
