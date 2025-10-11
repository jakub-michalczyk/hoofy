import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  serverTimestamp,
  SnapshotOptions,
  Timestamp,
  WithFieldValue,
} from 'firebase/firestore';
import { IListingItem } from '../components/listing-item/listing-item.model';

export const listingConverter: FirestoreDataConverter<IListingItem> = {
  toFirestore(item: WithFieldValue<IListingItem>): DocumentData {
    return {
      ...item,
      createdAt: item.createdAt ?? serverTimestamp(),
    };
  },

  fromFirestore(
    snapshot: QueryDocumentSnapshot<DocumentData>,
    options?: SnapshotOptions
  ): IListingItem {
    const data = snapshot.data(options);

    const rawCreatedAt = data['createdAt'];
    const createdAt =
      rawCreatedAt instanceof Timestamp
        ? rawCreatedAt.toMillis()
        : typeof rawCreatedAt === 'number'
          ? rawCreatedAt
          : Number(rawCreatedAt);

    return {
      id: snapshot.id,
      title: data['title'],
      description: data['description'],
      createdAt,
      promoted: data['promoted'],
      price: data['price'],
      images: data['images'],
      location: data['location'],
      type: data['type'],
      category: data['category'],
      subCategory: data['subCategory'],
      userId: data['userId'],
      details: data['details'],
      lng: data['lng'],
      lat: data['lat'],
      phone: data['phone'],
    };
  },
};
