import { GraphQLResolveInfo } from 'graphql';
import { DocumentNode } from 'graphql';
export declare type Maybe<T> = T | null;
export declare type Exact<T extends {
    [key: string]: unknown;
}> = {
    [K in keyof T]: T[K];
};
export declare type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>;
};
export declare type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>;
};
export declare type RequireFields<T, K extends keyof T> = {
    [X in Exclude<keyof T, K>]?: T[X];
} & {
    [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export declare type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
};
export declare type Query = {
    /**
     * retrieves all books
     *
     * Equivalent to GET /books
     */
    getBooks?: Maybe<Array<Maybe<BooksListItem>>>;
    /**
     * retrieve individual Book
     *
     * Equivalent to GET /books/{id}
     */
    getBooksId?: Maybe<Book>;
    /**
     * get all them authors
     *
     * Equivalent to GET /authors
     */
    getAuthors?: Maybe<Array<Maybe<AuthorsListItem>>>;
};
export declare type QuerygetBooksArgs = {
    limit?: Maybe<Scalars['Int']>;
};
export declare type QuerygetBooksIdArgs = {
    id: Scalars['String'];
};
export declare type QuerygetAuthorsArgs = {
    limit?: Maybe<Scalars['Int']>;
};
export declare type BooksListItem = {
    authorId?: Maybe<Scalars['Float']>;
    genre?: Maybe<Scalars['String']>;
    id?: Maybe<Scalars['Float']>;
    name?: Maybe<Scalars['String']>;
    yearPublished?: Maybe<Scalars['Float']>;
};
export declare type Book = {
    authorId?: Maybe<Scalars['Float']>;
    genre?: Maybe<Scalars['String']>;
    id?: Maybe<Scalars['Float']>;
    name?: Maybe<Scalars['String']>;
    yearPublished?: Maybe<Scalars['Float']>;
};
export declare type AuthorsListItem = {
    author?: Maybe<Scalars['String']>;
    id?: Maybe<Scalars['Float']>;
};
export declare type WithIndex<TObject> = TObject & Record<string, any>;
export declare type ResolversObject<TObject> = WithIndex<TObject>;
export declare type ResolverTypeWrapper<T> = Promise<T> | T;
export declare type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
    resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export declare type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
    fragment: string;
    resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export declare type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
    selectionSet: string;
    resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export declare type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export declare type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs> | StitchingResolver<TResult, TParent, TContext, TArgs>;
export declare type ResolverFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => Promise<TResult> | TResult;
export declare type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;
export declare type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => TResult | Promise<TResult>;
export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
    subscribe: SubscriptionSubscribeFn<{
        [key in TKey]: TResult;
    }, TParent, TContext, TArgs>;
    resolve?: SubscriptionResolveFn<TResult, {
        [key in TKey]: TResult;
    }, TContext, TArgs>;
}
export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
    subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
    resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}
export declare type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> = SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs> | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;
export declare type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> = ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>) | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;
export declare type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (parent: TParent, context: TContext, info: GraphQLResolveInfo) => Maybe<TTypes> | Promise<Maybe<TTypes>>;
export declare type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;
export declare type NextResolverFn<T> = () => Promise<T>;
export declare type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (next: NextResolverFn<TResult>, parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => TResult | Promise<TResult>;
/** Mapping between all available schema types and the resolvers types */
export declare type ResolversTypes = ResolversObject<{
    Query: ResolverTypeWrapper<{}>;
    BooksListItem: ResolverTypeWrapper<BooksListItem>;
    Float: ResolverTypeWrapper<Scalars['Float']>;
    String: ResolverTypeWrapper<Scalars['String']>;
    Int: ResolverTypeWrapper<Scalars['Int']>;
    Book: ResolverTypeWrapper<Book>;
    Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
    AuthorsListItem: ResolverTypeWrapper<AuthorsListItem>;
}>;
/** Mapping between all available schema types and the resolvers parents */
export declare type ResolversParentTypes = ResolversObject<{
    Query: {};
    BooksListItem: BooksListItem;
    Float: Scalars['Float'];
    String: Scalars['String'];
    Int: Scalars['Int'];
    Book: Book;
    Boolean: Scalars['Boolean'];
    AuthorsListItem: AuthorsListItem;
}>;
export declare type QueryResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
    getBooks?: Resolver<Maybe<Array<Maybe<ResolversTypes['BooksListItem']>>>, ParentType, ContextType, RequireFields<QuerygetBooksArgs, never>>;
    getBooksId?: Resolver<Maybe<ResolversTypes['Book']>, ParentType, ContextType, RequireFields<QuerygetBooksIdArgs, 'id'>>;
    getAuthors?: Resolver<Maybe<Array<Maybe<ResolversTypes['AuthorsListItem']>>>, ParentType, ContextType, RequireFields<QuerygetAuthorsArgs, never>>;
}>;
export declare type BooksListItemResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['BooksListItem'] = ResolversParentTypes['BooksListItem']> = ResolversObject<{
    authorId?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
    genre?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    id?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
    name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    yearPublished?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;
export declare type BookResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Book'] = ResolversParentTypes['Book']> = ResolversObject<{
    authorId?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
    genre?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    id?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
    name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    yearPublished?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;
export declare type AuthorsListItemResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['AuthorsListItem'] = ResolversParentTypes['AuthorsListItem']> = ResolversObject<{
    author?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    id?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;
export declare type Resolvers<ContextType = MeshContext> = ResolversObject<{
    Query?: QueryResolvers<ContextType>;
    BooksListItem?: BooksListItemResolvers<ContextType>;
    Book?: BookResolvers<ContextType>;
    AuthorsListItem?: AuthorsListItemResolvers<ContextType>;
}>;
import { MeshContext as BaseMeshContext, MeshInstance } from '@graphql-mesh/runtime';
import { InContextSdkMethod } from '@graphql-mesh/types';
export declare type QueryBookServiceSdk = {
    getBooks: InContextSdkMethod<Query['getBooks'], QuerygetBooksArgs, MeshContext>;
    getBooksId: InContextSdkMethod<Query['getBooksId'], QuerygetBooksIdArgs, MeshContext>;
};
export declare type MutationBookServiceSdk = {};
export declare type SubscriptionBookServiceSdk = {};
export declare type QueryAuthorServiceSdk = {
    getAuthors: InContextSdkMethod<Query['getAuthors'], QuerygetAuthorsArgs, MeshContext>;
};
export declare type MutationAuthorServiceSdk = {};
export declare type SubscriptionAuthorServiceSdk = {};
export declare type BookServiceContext = {
    ["BookService"]: {
        Query: QueryBookServiceSdk;
        Mutation: MutationBookServiceSdk;
        Subscription: SubscriptionBookServiceSdk;
    };
};
export declare type AuthorServiceContext = {
    ["AuthorService"]: {
        Query: QueryAuthorServiceSdk;
        Mutation: MutationAuthorServiceSdk;
        Subscription: SubscriptionAuthorServiceSdk;
    };
};
export declare type MeshContext = BookServiceContext & AuthorServiceContext & BaseMeshContext;
import { GetMeshOptions } from '@graphql-mesh/runtime';
import { YamlConfig } from '@graphql-mesh/types';
export declare const rawConfig: YamlConfig.Config;
export declare function getMeshOptions(): GetMeshOptions;
export declare const documentsInSDL: any[];
export declare function getBuiltMesh(): Promise<MeshInstance>;
export declare function getMeshSDK(): Promise<{}>;
export declare type Requester<C = {}> = <R, V>(doc: DocumentNode, vars?: V, options?: C) => Promise<R>;
export declare function getSdk<C>(requester: Requester<C>): {};
export declare type Sdk = ReturnType<typeof getSdk>;
