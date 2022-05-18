'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    async findByPage ( ctx ) {
        const { page } = ctx.query;
        const { per_page } = ctx.query;
        const { category } = ctx.query;
        const { demo } = ctx.query;
        let pageCount = per_page ? per_page : 6;
        let pageNumber = page ? page : 1;
        let result;

        /** Getting Element Blogs */
        let elementEntities = await strapi.query( 'blogs' ).model.query( qb => {
            qb.select( 'id', 'title', 'slug', 'author', 'date', 'comments', 'content', 'type', 'demoes' )
                .where( 'demoes', 'elements' )
        } ).fetchAll();

        elementEntities = elementEntities.toJSON();

        /** Getting Filtered Demo Blogs */
        if ( category ) {
            let filteredEntity = await strapi.query( 'blog-category' ).model.query( qb => {
                qb.where( 'slug', category )
            } ).fetch();
            filteredEntity = filteredEntity.toJSON();

            result = filteredEntity.blogs.filter( blog => {
                return blog.demoes.split( ',' ).indexOf( 'demo' + demo ) > -1 ? true : false
            } )

            elementEntities.forEach( item => {
                let flag = false;
                item.blog_categories.forEach( cat => {
                    if ( cat.slug === category ) flag = true;
                } )
                if ( flag ) {
                    result.push( item );
                }
            } )
        } else {
            let filteredEntities = await strapi.query( 'blogs' ).model.query( qb => {
                qb.select( 'id', 'title', 'slug', 'author', 'date', 'comments', 'content', 'type', 'demoes' )
                    .where( 'demoes', 'LIKE', '%demo' + demo )
                    .orWhere( 'demoes', 'LIKE', '%demo' + demo + ',%' )
            } ).fetchAll();
            result = filteredEntities.toJSON();

            elementEntities.forEach( item => {
                result.push( item )
            } )
        }

        /** Getting Recent Blogs */
        let recentBlogs = await strapi.query( 'blogs' ).model.query( qb => {
            qb.select( 'id', 'title', 'slug', 'date' )
                .where( 'demoes', 'LIKE', '%demo' + demo )
                .orWhere( 'demoes', 'LIKE', '%demo' + demo + ',%' )
        } ).fetchAll();
        recentBlogs = recentBlogs.toJSON();

        recentBlogs = recentBlogs.sort( function ( a, b ) {
            let timeA = new Date( a.date );
            let timeB = new Date( b.date );
            return timeB - timeA
        } )

        /** Getting Blog Category List */

        let blogCategoryList = await strapi.query( 'blog-category' ).model.query( qb => {
            qb.select( 'Name', 'slug' )
        } ).fetchAll();
        blogCategoryList = blogCategoryList.toJSON();
        blogCategoryList = blogCategoryList.sort( function ( a, b ) {
            let nameA = a.Name;
            let nameB = b.Name;
            if ( nameA > nameB ) {
                return 1;
            } else if ( nameA < nameB ) {
                return -1;
            }
            return 0;
        } )

        return { 'posts': result.slice( ( pageNumber - 1 ) * pageCount, pageNumber * pageCount ), 'totalCount': result.length, 'blogCategoryList': blogCategoryList, 'recentPosts': recentBlogs.slice( 0, 2 ) };
    },
    async findBySlug ( ctx ) {
        const { slug } = ctx.params;
        const { demo } = ctx.query;

        let selectedEntity = await strapi.query( 'blogs' ).model.query( qb => {
            qb.select( 'id', 'title', 'slug', 'date', 'type', 'comments', 'author', 'content' )
                .where( 'slug', slug )
        } ).fetch();

        let selectedBlog = selectedEntity.toJSON();

        /** Getting Blog Category List */
        let blogCategoryList = await strapi.query( 'blog-category' ).model.query( qb => {
            qb.select( 'Name', 'slug' )
        } ).fetchAll();

        blogCategoryList = blogCategoryList.toJSON();
        blogCategoryList = blogCategoryList.sort( function ( a, b ) {
            let nameA = a.Name;
            let nameB = b.Name;
            if ( nameA > nameB ) {
                return 1;
            } else if ( nameA < nameB ) {
                return -1;
            }
            return 0;
        } )

        /** Getting Recent Blogs */
        let recentBlogs = await strapi.query( 'blogs' ).model.query( qb => {
            qb.select( 'id', 'title', 'slug', 'date' )
                .where( 'demoes', 'LIKE', '%demo' + demo )
                .orWhere( 'demoes', 'LIKE', '%demo' + demo + ',%' )
        } ).fetchAll();

        recentBlogs = recentBlogs.toJSON();

        recentBlogs = recentBlogs.sort( function ( a, b ) {
            let timeA = new Date( a.date );
            let timeB = new Date( b.date );
            return timeB - timeA
        } )

        /** Getting Related Blogs */

        const selectedCategory = selectedEntity.toJSON().blog_categories;
        let categories = [];
        let filteredPostIds = [];
        /** Getting Filtered product Ids */
        for ( let i = 0; i < selectedCategory.length; i++ ) {
            categories = await strapi.query( 'blog-category' )
                .model.query( qb => {
                    qb.where( 'Name', 'LIKE', '%' + selectedCategory[ i ].Name )
                } )
                .fetch();

            let ids = categories.toJSON().blogs.reduce( ( acc, cur ) => {
                return [ ...acc, cur.id ];
            }, [] );

            filteredPostIds = [ ...filteredPostIds, ...ids ];
        }

        filteredPostIds = filteredPostIds.reduce( ( acc, cur ) => {
            if ( acc.includes( cur ) ) return acc;
            return [ ...acc, cur ]
        }, [] );

        /** Getting Related posts */
        const relatedEntities = await strapi.query( 'blogs' )
            .model.query( qb => {
                qb.select( 'id', 'title', 'slug', 'date', 'type', 'comments', 'author', 'content', 'demoes' )
                    .whereIn( 'id', filteredPostIds )
            } )
            .fetchAll();
        let relatedPosts = relatedEntities.toJSON();

        relatedPosts = relatedPosts.filter( post => {
            return ( post.demoes.split( ',' ).indexOf( 'demo' + demo ) > -1 || post.demoes === 'elements' ) && post.slug !== slug
        } )

        relatedPosts = relatedPosts.sort( function ( a, b ) {
            return b.id - a.id
        } )

        return { 'post': selectedBlog, 'blogCategoryList': blogCategoryList, 'recentPosts': recentBlogs.slice( 0, 2 ), 'relatedPosts': relatedPosts.slice( 0, 4 ) }
    }
};
