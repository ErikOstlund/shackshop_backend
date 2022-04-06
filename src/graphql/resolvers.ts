import { IResolvers } from '@graphql-tools/utils';
import { ObjectId } from 'mongodb';
import { Database, Listing } from '../lib/types';

export const resolvers: IResolvers = {
	Query: {
		listings: async (
			_root: undefined,
			_args: Record<string, unknown>,
			{ db }: { db: Database }
		): Promise<Listing[]> => {
			return await db.listings.find({}).toArray();
		}
	},
	Mutation: {
		deleteListing: async (
			_root: undefined,
			{ id }: { id: string },
			{ db }: { db: Database }
		): Promise<Listing> => {
			const deleteRes = await db.listings.findOneAndDelete({
				_id: new ObjectId(id)
			});

			if (!deleteRes.value) {
				throw new Error('Failed to delete listing!');
			}

			return deleteRes.value;
		}
	},
	Listing: {
		// all fields (title, image, address...) must be resolved
		// graphQL does this implicitly (automatically) if names match
		// we have to do this manually for id because graphQL used _id
		id: (listing: Listing): string => listing._id.toString()
	}
};
