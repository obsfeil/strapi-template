'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    async findDemoProducts ( ctx ) {
        var tmpPicture = {
            "id": 1,
            "width": 1,
            "height": 1,
            "url": ''
        }
        var tmpCategory = {
            "id": 1,
            "name": '',
            "parent_name": 1,
            "demoes": '',
            "slug": ''
        }
        var tmpTag = {
            "id": 1,
            "name": '',
            "slug": ''
        }

        let products, posts;
        const { demo } = ctx.params;
        let is_picture = ctx.query.is_picture ? ctx.query.is_picture : false;
        let demoNumber = demo;
        demoNumber = demoNumber.slice( 4 );

        products = await strapi
            .query( 'products' )
            .model.query( qb => {
                qb.select( 'id', 'name', 'slug', 'price', 'sku', 'stock', 'short_description', 'sale_price', 'ratings', 'reviews', 'is_hot', 'is_sale', 'is_new', 'is_out_of_stock', 'demoes', 'release_date', 'developer', 'publisher', 'game_mode', 'rated', 'until' )
                    .where( 'demoes', 'LIKE', '%demo' + demoNumber )
                    .orWhere( 'demoes', 'LIKE', '%demo' + demoNumber + ',%' );
            } )
            .fetchAll();

        products = products.toJSON();

        if ( is_picture === false )
            for ( let i = 0; i < products.length; i++ ) {
                products[ i ].pictures = [];
            }

        for ( let i = 0; i < products.length; i++ ) {
            if ( is_picture === true ) {
                for ( let j = 0; j < products[ i ].pictures.length; j++ ) {
                    var result = {};
                    for ( let key in products[ i ].pictures[ j ] ) {
                        for ( let keyj in tmpPicture ) {
                            if ( key === keyj ) {
                                result[ key ] = products[ i ].pictures[ j ][ key ];
                            }
                        }
                    }
                    products[ i ].pictures[ j ] = result;
                }
            }
            for ( let j = 0; j < products[ i ].large_pictures.length; j++ ) {
                var result = {};
                for ( let key in products[ i ].large_pictures[ j ] ) {
                    for ( let keyj in tmpPicture ) {
                        if ( key === keyj ) {
                            result[ key ] = products[ i ].large_pictures[ j ][ key ];
                        }
                    }
                }
                products[ i ].large_pictures[ j ] = result;
            }
            for ( let j = 0; j < products[ i ].small_pictures.length; j++ ) {
                var result = {};
                for ( let key in products[ i ].small_pictures[ j ] ) {
                    for ( let keyj in tmpPicture ) {
                        if ( key === keyj ) {
                            result[ key ] = products[ i ].small_pictures[ j ][ key ];
                        }
                    }
                }
                products[ i ].small_pictures[ j ] = result;
            }
            for ( let j = 0; j < products[ i ].pictures.length; j++ ) {
                var result = {};
                for ( let key in products[ i ].pictures[ j ] ) {
                    for ( let keyj in tmpPicture ) {
                        if ( key === keyj ) {
                            result[ key ] = products[ i ].pictures[ j ][ key ];
                        }
                    }
                }
                products[ i ].pictures[ j ] = result;
            }
            for ( let j = 0; j < products[ i ].product_categories.length; j++ ) {
                var result = {};
                for ( let key in products[ i ].product_categories[ j ] ) {
                    for ( let keyj in tmpCategory ) {
                        if ( key === keyj ) {
                            result[ key ] = products[ i ].product_categories[ j ][ key ];
                        }
                    }
                }
                products[ i ].product_categories[ j ] = result;
            }
            for ( let j = 0; j < products[ i ].product_tags.length; j++ ) {
                var result = {};
                for ( let key in products[ i ].product_tags[ j ] ) {
                    for ( let keyj in tmpTag ) {
                        if ( key === keyj ) {
                            result[ key ] = products[ i ].product_tags[ j ][ key ];
                        }
                    }
                }
                products[ i ].product_tags[ j ] = result;
            }
        }

        var tmpBlogCategory = {
            "id": 1,
            "Name": '',
            "slug": ''
        }

        posts = await strapi.query( 'blogs' ).model.query( qb => {
            qb.select( 'id', 'title', 'slug', 'author', 'date', 'comments', 'content', 'type', 'demoes' )
                .where( 'demoes', 'LIKE', '%demo' + demoNumber )
                .orWhere( 'demoes', 'LIKE', '%demo' + demoNumber + ',%' );
        } )
            .fetchAll();
        posts = posts.toJSON();

        for ( let i = 0; i < posts.length; i++ ) {
            for ( let j = 0; j < posts[ i ].small_picture.length; j++ ) {
                var result = {};
                for ( let key in posts[ i ].small_picture[ j ] ) {
                    for ( let keyj in tmpPicture ) {
                        if ( key === keyj ) {
                            result[ key ] = posts[ i ].small_picture[ j ][ key ];
                        }
                    }
                }
                posts[ i ].small_picture[ j ] = result;
            }
            for ( let j = 0; j < posts[ i ].picture.length; j++ ) {
                var result = {};
                for ( let key in posts[ i ].picture[ j ] ) {
                    for ( let keyj in tmpPicture ) {
                        if ( key === keyj ) {
                            result[ key ] = posts[ i ].picture[ j ][ key ];
                        }
                    }
                }
                posts[ i ].picture[ j ] = result;
            }
            for ( let j = 0; j < posts[ i ].blog_categories.length; j++ ) {
                var result = {};
                for ( let key in posts[ i ].blog_categories[ j ] ) {
                    for ( let keyj in tmpBlogCategory ) {
                        if ( key === keyj ) {
                            result[ key ] = posts[ i ].blog_categories[ j ][ key ];
                        }
                    }
                }
                posts[ i ].blog_categories[ j ] = result;
            }
        }

        return { 'products': products, 'posts': posts };
    },
    async findBySlug ( ctx ) {
        var tmpPicture = {
            "id": 1,
            "width": 1,
            "height": 1,
            "url": ''
        }
        var tmpCategory = {
            "id": 1,
            "name": '',
            "parent_name": 1,
            "demoes": '',
            "slug": ''
        }

        /** Getting variables */
        const { slug } = ctx.params;
        const { demo } = ctx.query;
        let is_best = ctx.query.is_best ? ctx.query.is_best : 'false';
        let is_special = ctx.query.is_special ? ctx.query.is_special : 'true';
        let quick_view = ctx.query.quick_view ? ctx.query.quick_view : false;
        let categories, filteredProductIds = [];

        /** Getting Categories */
        let entity = await strapi.query( 'products' )
            .model.query( qb => {
                qb.select( 'id', 'name', 'slug', 'price', 'sku', 'stock', 'short_description', 'sale_price', 'ratings', 'reviews', 'is_hot', 'is_sale', 'is_new', 'is_out_of_stock', 'demoes', 'release_date', 'developer', 'publisher', 'game_mode', 'rated', 'until' )
                    .where( "slug", slug );
            } )
            .fetch();
        entity = entity.toJSON();
        for ( let i = 0; i < entity.product_categories.length; i++ ) {
            var result = {};
            for ( let key in entity.product_categories[ i ] ) {
                for ( let keyj in tmpCategory ) {
                    if ( key === keyj ) {
                        result[ key ] = entity.product_categories[ i ][ key ];
                    }
                }
            }
            entity.product_categories[ i ] = result;
        }
        for ( let i = 0; i < entity.large_pictures.length; i++ ) {
            var result = {};
            for ( let key in entity.large_pictures[ i ] ) {
                for ( let keyj in tmpPicture ) {
                    if ( key === keyj ) {
                        result[ key ] = entity.large_pictures[ i ][ key ];
                    }
                }
            }
            entity.large_pictures[ i ] = result;
        }
        for ( let i = 0; i < entity.pictures.length; i++ ) {
            var result = {};
            for ( let key in entity.pictures[ i ] ) {
                for ( let keyj in tmpPicture ) {
                    if ( key === keyj ) {
                        result[ key ] = entity.pictures[ i ][ key ];
                    }
                }
            }
            entity.pictures[ i ] = result;
        }
        for ( let i = 0; i < entity.small_pictures.length; i++ ) {
            var result = {};
            for ( let key in entity.small_pictures[ i ] ) {
                for ( let keyj in tmpPicture ) {
                    if ( key === keyj ) {
                        result[ key ] = entity.small_pictures[ i ][ key ];
                    }
                }
            }
            entity.small_pictures[ i ] = result;
        }

        if ( quick_view ) {
            return { 'product': entity }
        }
        const category = entity.product_categories;

        /** Getting Filtered product Ids */
        for ( let i = 0; i < category.length; i++ ) {
            categories = await strapi.query( 'product-categories' )
                .model.query( qb => {
                    qb.where( 'slug', category[ i ].slug )
                        .orWhere( 'parent_name', 'LIKE', category[ i ].name )
                        .orWhere( 'parent_name', 'LIKE', category[ i ].name + ',%' )
                        .orWhere( 'parent_name', 'LIKE', '%,' + category[ i ].name )
                        .orWhere( 'parent_name', 'LIKE', '%,' + category[ i ].name + ',%' )
                } )
                .fetchAll();
            categories = categories.toJSON();

            for ( let j = 0; j < categories.length; j++ ) {
                // let pp = categories[ j ].parent_name.split( ',' );
                // return pp.indexOf( category[ i ] )
                // if(categories[j].parent_name.split(',').indexof(category[i].name))
                let ids = categories[ j ].products.reduce( ( acc, cur ) => {
                    return [ ...acc, cur.id ];
                }, [] );
                filteredProductIds = [ ...filteredProductIds, ...ids ];
            }
        }

        filteredProductIds = filteredProductIds.reduce( ( acc, cur ) => {
            if ( acc.includes( cur ) ) return acc;
            return [ ...acc, cur ]
        }, [] );

        filteredProductIds = filteredProductIds.sort( function ( a, b ) {
            return a - b;
        } )

        /** Getting Related products */
        const relatedEntities = await strapi.query( 'products' )
            .model.query( qb => {
                qb.select( 'id', 'name', 'slug', 'price', 'sku', 'stock', 'short_description', 'sale_price', 'ratings', 'reviews', 'is_hot', 'is_sale', 'is_new', 'is_out_of_stock', 'demoes', 'release_date', 'developer', 'publisher', 'game_mode', 'rated', 'until' )
                    .whereIn( 'id', filteredProductIds )
                    .where( 'demoes', 'LIKE', '%demo' + demo )
                    .orWhere( 'demoes', 'LIKE', '%demo' + demo + ',%' )
            } )
            .fetchAll();
        let relatedProducts = relatedEntities.toJSON();

        for ( let i = 0; i < relatedProducts.length; i++ ) {
            relatedProducts[ i ].product_tags = [];
            relatedProducts[ i ].product_brands = [];
            for ( let j = 0; j < relatedProducts[ i ].variants.length; j++ ) {
                relatedProducts[ i ].variants[ j ].size = [];
                relatedProducts[ i ].variants[ j ].colors = [];
            }
            for ( let j = 0; j < relatedProducts[ i ].large_pictures.length; j++ ) {
                var result = {};
                for ( let key in relatedProducts[ i ].large_pictures[ j ] ) {
                    for ( let keyj in tmpPicture ) {
                        if ( key === keyj ) {
                            result[ key ] = relatedProducts[ i ].large_pictures[ j ][ key ];
                        }
                    }
                }
                relatedProducts[ i ].large_pictures[ j ] = result;
            }
            for ( let j = 0; j < relatedProducts[ i ].pictures.length; j++ ) {
                var result = {};
                for ( let key in relatedProducts[ i ].pictures[ j ] ) {
                    for ( let keyj in tmpPicture ) {
                        if ( key === keyj ) {
                            result[ key ] = relatedProducts[ i ].pictures[ j ][ key ];
                        }
                    }
                }
                relatedProducts[ i ].pictures[ j ] = result;
            }
            for ( let j = 0; j < relatedProducts[ i ].small_pictures.length; j++ ) {
                var result = {};
                for ( let key in relatedProducts[ i ].small_pictures[ j ] ) {
                    for ( let keyj in tmpPicture ) {
                        if ( key === keyj ) {
                            result[ key ] = relatedProducts[ i ].small_pictures[ j ][ key ];
                        }
                    }
                }
                relatedProducts[ i ].small_pictures[ j ] = result;
            }
            for ( let j = 0; j < relatedProducts[ i ].product_categories.length; j++ ) {
                var result = {};
                for ( let key in relatedProducts[ i ].product_categories[ j ] ) {
                    for ( let keyj in tmpCategory ) {
                        if ( key === keyj ) {
                            result[ key ] = relatedProducts[ i ].product_categories[ j ][ key ];
                        }
                    }
                }
                relatedProducts[ i ].product_categories[ j ] = result;
            }
        }

        /** Getting prev and Next Product */
        var curIndex = -1;
        var prevProduct = null;
        var nextProduct = null;
        relatedProducts.map( ( item, index ) => {
            if ( item.id == entity.id ) curIndex = index;
        } );
        if ( curIndex >= 1 )
            prevProduct = relatedProducts[ curIndex - 1 ];
        else prevProduct = null;

        if ( curIndex < relatedProducts.length - 1 )
            nextProduct = relatedProducts[ curIndex + 1 ];
        else nextProduct = null;

        relatedProducts = relatedProducts.filter( product => {
            return product.id !== entity.id;
        } )

        if ( is_special === 'false' ) {
            return { 'product': entity, 'relatedProducts': relatedProducts, 'prevProduct': prevProduct, 'nextProduct': nextProduct };
        }

        /** Getting Demo products */
        const demoEntities = await strapi.query( 'products' )
            .model.query( qb => {
                qb.select( 'id', 'name', 'slug', 'price', 'sale_price', 'sale_count', 'ratings', 'reviews', 'is_hot', 'is_new', 'is_sale', 'is_out_of_stock', 'demoes', 'until' )
                    .where( 'demoes', 'LIKE', '%demo' + demo )
                    .orWhere( 'demoes', 'LIKE', '%demo' + demo + ',%' )
            } )
            .fetchAll();
        let demoProducts = demoEntities.toJSON();

        for ( let i = 0; i < demoProducts.length; i++ ) {
            demoProducts[ i ].product_tags = [];
            if ( is_best === 'false' ) {
                demoProducts[ i ].large_pictures = [];
            }
            if ( demo !== '16' ) {
                demoProducts[ i ].pictures = [];
            }
            demoProducts[ i ].product_brands = [];
            demoProducts[ i ].product_categories = [];
            for ( let j = 0; j < demoProducts[ i ].variants.length; j++ ) {
                demoProducts[ i ].variants[ j ].size = [];
                demoProducts[ i ].variants[ j ].colors = [];
            }
            for ( let j = 0; j < demoProducts[ i ].small_pictures.length; j++ ) {
                var result = {};
                for ( let key in demoProducts[ i ].small_pictures[ j ] ) {
                    for ( let keyj in tmpPicture ) {
                        if ( key === keyj ) {
                            result[ key ] = demoProducts[ i ].small_pictures[ j ][ key ];
                        }
                    }
                }
                demoProducts[ i ].small_pictures[ j ] = result;
            }
            if ( demo === 16 ) {
                for ( let j = 0; j < demoProducts[ i ].pictures.length; j++ ) {
                    var result = {};
                    for ( let key in demoProducts[ i ].pictures[ j ] ) {
                        for ( let keyj in tmpPicture ) {
                            if ( key === keyj ) {
                                result[ key ] = demoProducts[ i ].pictures[ j ][ key ];
                            }
                        }
                    }
                    demoProducts[ i ].pictures[ j ] = result;
                }
            }
            for ( let j = 0; j < demoProducts[ i ].product_categories.length; j++ ) {
                var result = {};
                for ( let key in demoProducts[ i ].product_categories[ j ] ) {
                    for ( let keyj in tmpCategory ) {
                        if ( key === keyj ) {
                            result[ key ] = demoProducts[ i ].product_categories[ j ][ key ];
                        }
                    }
                }
                demoProducts[ i ].product_categories[ j ] = result;
            }
        }

        /** Getting Best Selling Products */
        let tmpProducts = [ ...demoProducts ];
        let bestSellingProducts = tmpProducts.sort( function ( a, b ) {
            return b.sale_count - a.sale_count;
        } )
        if ( is_best === 'false' )
            bestSellingProducts = bestSellingProducts.slice( 0, 3 );
        else
            bestSellingProducts = bestSellingProducts.slice( 0, 5 );

        /** Getting Featured Products */
        tmpProducts = [ ...demoProducts ];
        let featuredProducts = tmpProducts.sort( function ( a, b ) {
            var featuredA = ( a.is_hot === true ? 1 : 0 );
            var featuredB = ( b.is_hot === true ? 1 : 0 );
            if ( featuredA < featuredB ) {
                return 1;
            } else if ( featuredA === featuredB ) {
                return 0;
            } else {
                return -1;
            }
        } );
        featuredProducts = featuredProducts.slice( 0, 3 );
        // for ( let i = 0; i < featuredProducts.length; i++ ) {
        //     featuredProducts[ i ].large_pictures = [];
        // }

        /** Getting Latest Products */
        tmpProducts = [ ...demoProducts ];
        let latestProducts = tmpProducts.sort( function ( a, b ) {
            var newA = ( a.is_new === true ? 1 : 0 );
            var newB = ( b.is_new === true ? 1 : 0 );
            if ( newA < newB ) {
                return 1;
            } else if ( newA === newB ) {
                return 0;
            } else {
                return -1;
            }
        } )
        latestProducts = latestProducts.slice( 0, 3 );
        // for ( let i = 0; i < latestProducts.length; i++ ) {
        //     latestProducts[ i ].large_pictures = [];
        // }

        /** Getting Top-rated Products */
        tmpProducts = [ ...demoProducts ];
        let topRatedProducts = tmpProducts.sort( function ( a, b ) {
            return b.ratings - a.ratings;
        } )
        topRatedProducts = topRatedProducts.slice( 0, 3 );
        // for ( let i = 0; i < topRatedProducts.length; i++ ) {
        //     topRatedProducts[ i ].large_pictures = [];
        // }

        return { 'product': entity, 'relatedProducts': relatedProducts, 'prevProduct': prevProduct, 'nextProduct': nextProduct, 'featuredProducts': featuredProducts, 'bestSellingProducts': bestSellingProducts, 'latestProducts': latestProducts, 'topRatedProducts': topRatedProducts };
    },
    async findShopProducts ( ctx ) {
        var tmpPicture = {
            "id": 1,
            "width": 1,
            "height": 1,
            "url": ''
        }
        var tmpCategory = {
            "id": 1,
            "name": '',
            "parent_name": 1,
            "demoes": '',
            "slug": ''
        }
        var tmpTag = {
            "id": 1,
            "name": '',
            "slug": ''
        }

        /** Getting and Setting variables and const variables*/
        const { demo } = ctx.query;
        const { category } = ctx.query;
        const { brand } = ctx.query;
        const { size } = ctx.query;
        const { color } = ctx.query;
        const { ratings } = ctx.query;
        const { order_by } = ctx.query;
        const { tag } = ctx.query;
        const { search_term } = ctx.query;
        let page;
        page = ctx.query.page ? ctx.query.page : 1;
        let per_page;
        per_page = ctx.query.per_page ? ctx.query.per_page : 12;
        let min_price, max_price;
        min_price = ctx.query.min_price ? ctx.query.min_price : 0;
        max_price = ctx.query.max_price ? ctx.query.max_price : 1700;
        let is_picture = ctx.query.is_picture ? ctx.query.is_picture : false;

        /** Getting Demo products */
        const demoEntities = await strapi.query( 'products' )
            .model.query( qb => {
                qb.select( 'id', 'name', 'slug', 'price', 'sale_price', 'short_description', 'stock', 'ratings', 'reviews', 'is_hot', 'is_sale', 'is_out_of_stock', 'demoes', 'release_date', 'developer', 'publisher', 'game_mode', 'rated', 'until' )
                    .where( 'demoes', 'LIKE', '%demo' + demo )
                    .orWhere( 'demoes', 'LIKE', '%demo' + demo + ',%' )
            } )
            .fetchAll();
        let demoProducts = demoEntities.toJSON();

        for ( let i = 0; i < demoProducts.length; i++ ) {
            if ( is_picture === false )
                demoProducts[ i ].pictures = [];
            else {
                for ( let j = 0; j < demoProducts[ i ].pictures.length; j++ ) {
                    var result = {};
                    for ( let key in demoProducts[ i ].pictures[ j ] ) {
                        for ( let keyj in tmpPicture ) {
                            if ( key === keyj ) {
                                result[ key ] = demoProducts[ i ].pictures[ j ][ key ];
                            }
                        }
                    }
                    demoProducts[ i ].pictures[ j ] = result;
                }
            }
            for ( let j = 0; j < demoProducts[ i ].large_pictures.length; j++ ) {
                var result = {};
                for ( let key in demoProducts[ i ].large_pictures[ j ] ) {
                    for ( let keyj in tmpPicture ) {
                        if ( key === keyj ) {
                            result[ key ] = demoProducts[ i ].large_pictures[ j ][ key ];
                        }
                    }
                }
                demoProducts[ i ].large_pictures[ j ] = result;
            }
            for ( let j = 0; j < demoProducts[ i ].small_pictures.length; j++ ) {
                var result = {};
                for ( let key in demoProducts[ i ].small_pictures[ j ] ) {
                    for ( let keyj in tmpPicture ) {
                        if ( key === keyj ) {
                            result[ key ] = demoProducts[ i ].small_pictures[ j ][ key ];
                        }
                    }
                }
                demoProducts[ i ].small_pictures[ j ] = result;
            }
            for ( let j = 0; j < demoProducts[ i ].product_categories.length; j++ ) {
                var result = {};
                for ( let key in demoProducts[ i ].product_categories[ j ] ) {
                    for ( let keyj in tmpCategory ) {
                        if ( key === keyj ) {
                            result[ key ] = demoProducts[ i ].product_categories[ j ][ key ];
                        }
                    }
                }
                demoProducts[ i ].product_categories[ j ] = result;
            }
            for ( let j = 0; j < demoProducts[ i ].product_tags.length; j++ ) {
                var result = {};
                for ( let key in demoProducts[ i ].product_tags[ j ] ) {
                    for ( let keyj in tmpTag ) {
                        if ( key === keyj ) {
                            result[ key ] = demoProducts[ i ].product_tags[ j ][ key ];
                        }
                    }
                }
                demoProducts[ i ].product_tags[ j ] = result;
            }
        }

        /** Getting SelectedCategory */
        let subCategories = [];
        if ( category && category !== 'all' ) {
            let selectedCategory = await strapi.query( 'product-categories' )
                .model.query( qb => {
                    qb.select( 'id', 'name', 'slug', 'parent_name', 'demoes' )
                        .where( 'slug', category )
                } )
                .fetch();
            let selectedName = '';
            if ( selectedCategory !== null ) {
                selectedCategory = selectedCategory.toJSON();
                selectedName = selectedCategory.name;
                if ( selectedCategory.parent_name )
                    selectedName = selectedCategory.parent_name.concat( ',', selectedName );
            }

            subCategories = await strapi.query( 'product-categories' )
                .model.query( qb => {
                    qb.select( 'id', 'name', 'slug', 'parent_name', 'demoes' )
                        .where( 'parent_name', selectedName )
                } ).fetchAll();
            subCategories = subCategories.toJSON();
            subCategories = subCategories.filter( category => {
                return category.demoes.split( ',' ).indexOf( 'demo' + demo ) > -1
            } )

            for ( let i = 0; i < subCategories.length; i++ ) {
                let categoryName = selectedName.concat( ',', subCategories[ i ].name );
                let grandSubCategories = await strapi.query( 'product-categories' )
                    .model.query( qb => {
                        qb.select( 'id', 'name', 'slug', 'parent_name', 'demoes' )
                            .where( 'parent_name', categoryName )
                    } ).fetchAll();
                grandSubCategories = grandSubCategories.toJSON();
                grandSubCategories = grandSubCategories.filter( category => {
                    return category.demoes.split( ',' ).indexOf( 'demo' + demo ) > -1
                } )
                for ( let j = 0; j < grandSubCategories.length; j++ ) {
                    grandSubCategories[ j ].products = [];
                }
                subCategories = subCategories.concat( grandSubCategories );
            }
        }

        /** Getting Filtered Products */
        let filteredProducts = demoProducts.filter( product => {

            /** Header Search Filter */
            let searchFlag = false;
            if ( search_term ) {
                product.slug.includes( search_term ) && ( searchFlag = true );
            } else {
                searchFlag = true;
            }

            /** Category Filter */
            let categoryFlag = false;
            if ( category && category !== 'all' ) {
                for ( let i = 0; i < product.product_categories.length; i++ ) {
                    product.product_categories[ i ].slug === category && ( categoryFlag = true );

                    subCategories.forEach( category => {
                        category.id === product.product_categories[ i ].id && ( categoryFlag = true );
                    } )
                }
            } else {
                categoryFlag = true;
            }

            /** Brand Filter */
            let brandFlag = false;
            if ( brand && product.product_brands.length > 0 ) {
                brand.split( ',' ).map( brand => {
                    for ( let i = 0; i < product.product_brands.length; i++ ) {
                        product.product_brands[ i ].slug === brand && ( brandFlag = true );
                    }
                } )
            } else if ( !brand ) {
                brandFlag = true;
            }

            /** Size Filter */
            let sizeFlag = false;
            if ( product.variants.length > 0 && size ) {
                size.split( ',' ).map( size => {
                    for ( let i = 0; i < product.variants.length; i++ ) {
                        for ( let j = 0; j < product.variants[ i ].size.length; j++ ) {
                            product.variants[ i ].size[ j ].size === size && ( sizeFlag = true );
                        }
                    }
                } )
            } else if ( !size ) {
                sizeFlag = true;
            }

            /** Color Filter */
            let colorFlag = false;
            if ( product.variants.length > 0 && color ) {
                color.split( ',' ).map( color => {
                    for ( let i = 0; i < product.variants.length; i++ ) {
                        for ( let j = 0; j < product.variants[ i ].colors.length; j++ ) {
                            product.variants[ i ].colors[ j ].color_name === color && ( colorFlag = true );
                        }
                    }
                } )
            } else if ( !color ) {
                colorFlag = true;
            }

            /** Tag Filter */
            let tagFlag = false;
            if ( tag && product.product_tags.length > 0 ) {
                product.product_tags.map( item => {
                    item.slug === tag && ( tagFlag = true )
                } )
            } else if ( !tag ) {
                tagFlag = true;
            }

            /** Ratings Filter */
            let ratingFlag = false;
            if ( ratings ) {
                ratings.split( ',' ).map( rating => {
                    product.ratings === parseInt( rating ) && ( ratingFlag = true )
                } )
            } else if ( !ratings ) {
                ratingFlag = true
            }

            /** Price Filter */
            let priceFlag = false;
            if ( product.variants.length > 0 ) {
                let flag = true;

                for ( let i = 0; i < product.variants.length; i++ ) {
                    if ( ( ( min_price > product.variants[ i ].price || product.variants[ i ].price > max_price ) && product.variants[ i ].sale_price === null ) || ( ( min_price > product.variants[ i ].sale_price || product.variants[ i ].sale_price > max_price ) && product.variants[ i ].sale_price ) )
                        flag = false;
                }
                if ( product.sale_price && ( min_price > product.sale_price || product.sale_price > max_price ) )
                    flag = false;
                else if ( product.sale_price === null && product.price && ( min_price > product.price || product.price > max_price ) )
                    flag = false;
                priceFlag = flag;
            } else if ( product.sale_price ) {
                ( min_price < product.sale_price && product.sale_price < max_price ) && ( priceFlag = true );
            } else {
                ( min_price < product.price && product.price < max_price ) && ( priceFlag = true );
            }

            return categoryFlag && brandFlag && sizeFlag && colorFlag && tagFlag && ratingFlag && priceFlag && searchFlag;
        } )

        filteredProducts = filteredProducts.sort( function ( a, b ) {
            return a.id - b.id;
        } )

        switch ( order_by ) {
            case 'new':
                filteredProducts.sort( function ( a, b ) {
                    var newA = ( a.is_new === true ? 1 : 0 );
                    var newB = ( b.is_new === true ? 1 : 0 );
                    if ( newA < newB ) {
                        return 1;
                    } else if ( newA === newB ) {
                        return 0;
                    } else {
                        return -1;
                    }
                } );
                break;
            case 'featured':
                filteredProducts.sort( function ( a, b ) {
                    var featuredA = ( a.is_hot === true ? 1 : 0 );
                    var featuredB = ( b.is_hot === true ? 1 : 0 );
                    if ( featuredA < featuredB ) {
                        return 1;
                    } else if ( featuredA === featuredB ) {
                        return 0;
                    } else {
                        return -1;
                    }
                } );
                break;
            case 'rating':
                filteredProducts.sort( function ( a, b ) {
                    return b.ratings - a.ratings;
                } );
                break;
            case 'price-asc':
                filteredProducts.sort( function ( a, b ) {
                    var priceA = 100000, priceB = 100000;
                    priceA = a.sale_price ? a.sale_price : a.price ? a.price : 100000;
                    if ( a.variants && priceA === 100000 ) {
                        for ( let i = 0; i < a.variants.length; i++ ) {
                            let tmpPrice = a.variants[ i ].sale_price ? a.variants[ i ].sale_price : a.variants[ i ].price ? a.variants[ i ].price : 100000;
                            priceA = priceA > tmpPrice ? tmpPrice : priceA;
                        }
                    }
                    priceB = b.sale_price ? b.sale_price : b.price ? b.price : 100000;
                    if ( b.variants && priceB === 100000 ) {
                        for ( let i = 0; i < b.variants.length; i++ ) {
                            let tmpPrice = b.variants[ i ].sale_price ? b.variants[ i ].sale_price : b.variants[ i ].price ? b.variants[ i ].price : 100000;
                            priceB = priceB > tmpPrice ? tmpPrice : priceB;
                        }
                    }
                    if ( priceA > priceB ) {
                        return 1;
                    } else if ( priceA === priceB ) {
                        return 0;
                    } else {
                        return -1;
                    }
                } )
                break;
            case 'price-dec':
                filteredProducts.sort( function ( a, b ) {
                    var priceA = 100000, priceB = 100000;
                    priceA = a.sale_price ? a.sale_price : a.price ? a.price : 100000;
                    if ( a.variants && priceA === 100000 ) {
                        for ( let i = 0; i < a.variants.length; i++ ) {
                            let tmpPrice = a.variants[ i ].sale_price ? a.variants[ i ].sale_price : a.variants[ i ].price ? a.variants[ i ].price : 100000;
                            priceA = priceA > tmpPrice ? tmpPrice : priceA;
                        }
                    }
                    priceB = b.sale_price ? b.sale_price : b.price ? b.price : 100000;
                    if ( b.variants && priceB === 100000 ) {
                        for ( let i = 0; i < b.variants.length; i++ ) {
                            let tmpPrice = b.variants[ i ].sale_price ? b.variants[ i ].sale_price : b.variants[ i ].price ? b.variants[ i ].price : 100000;
                            priceB = priceB > tmpPrice ? tmpPrice : priceB;
                        }
                    }
                    if ( priceA < priceB ) {
                        return 1;
                    } else if ( priceA === priceB ) {
                        return 0;
                    } else {
                        return -1;
                    }
                } )
                break;
            default:
                break;
        }

        return { 'totalCount': filteredProducts.length, 'products': filteredProducts.slice( ( page - 1 ) * per_page, page * per_page ) };
    },
    async findSearchedProducts ( ctx ) {
        var tmpPicture = {
            "id": 1,
            "width": 1,
            "height": 1,
            "url": ''
        }

        const { demo } = ctx.query;
        const { search_term } = ctx.query;
        const { category } = ctx.query;

        let products, searchedProducts;

        products = await strapi.query( 'products' ).model.query( qb => {
            qb.select( 'id', 'name', 'slug', 'price', 'sale_price' )
                .where( 'demoes', 'LIKE', '%demo' + demo )
                .orWhere( 'demoes', 'LIKE', '%demo' + demo + ',%' )
        } ).fetchAll();

        products = products.toJSON();

        /** Getting SelectedCategory */
        let subCategories = [];
        if ( category && category !== 'all' ) {
            let selectedCategory = await strapi.query( 'product-categories' )
                .model.query( qb => {
                    qb.select( 'id', 'name', 'slug', 'parent_name', 'demoes' )
                        .where( 'demoes', 'LIKE', '%demo' + demo )
                        .orWhere( 'demoes', 'LIKE', '%demo' + demo + ',%' )
                        .where( 'name', category )
                } )
                .fetch();
            selectedCategory = selectedCategory.toJSON();
            let selectedName = selectedCategory.name;

            if ( selectedCategory.parent_name )
                selectedName = selectedName.concat( ',', selectedCategory.parent_name );

            subCategories = await strapi.query( 'product-categories' )
                .model.query( qb => {
                    qb.select( 'id', 'name', 'slug', 'parent_name', 'demoes' )
                        .where( 'parent_name', selectedName )
                } ).fetchAll();
            subCategories = subCategories.toJSON();
            subCategories = subCategories.filter( category => {
                return category.demoes.split( ',' ).indexOf( 'demo' + demo ) > -1
            } )
        }

        searchedProducts = products.filter( product => {
            let flag = false;
            product.slug.includes( search_term ) && ( flag = true );

            /** Category Filter */
            let categoryFlag = false;
            if ( category ) {
                for ( let i = 0; i < product.product_categories.length; i++ ) {
                    product.product_categories[ i ].slug === category && ( categoryFlag = true );

                    subCategories.forEach( category => {
                        category.id === product.product_categories[ i ].id && ( categoryFlag = true );
                    } )
                }
            } else {
                categoryFlag = true;
            }
            return flag && categoryFlag
        } )
        searchedProducts = searchedProducts.slice( 0, 5 );
        if ( searchedProducts.length > 0 )
            for ( let i = 0; i < searchedProducts.length; i++ ) {
                searchedProducts[ i ].large_pictures = [];
                searchedProducts[ i ].pictures = [];
                searchedProducts[ i ].product_categories = [];
                searchedProducts[ i ].product_tags = [];
                searchedProducts[ i ].product_brands = [];

                for ( let j = 0; j < searchedProducts[ i ].small_pictures.length; j++ ) {
                    var result = {};
                    for ( let key in searchedProducts[ i ].small_pictures[ j ] ) {
                        for ( let keyj in tmpPicture ) {
                            if ( key === keyj ) {
                                result[ key ] = searchedProducts[ i ].small_pictures[ j ][ key ];
                            }
                        }
                    }
                    searchedProducts[ i ].small_pictures[ j ] = result;
                }
            }

        return searchedProducts;
    },
    async findSidebarList ( ctx ) {
        var tmpPicture = {
            "id": 1,
            "width": 1,
            "height": 1,
            "url": ''
        }
        var tmpCategory = {
            "id": 1,
            "name": '',
            "parent_name": 1,
            "demoes": '',
            "slug": ''
        }

        const { demo } = ctx.query;
        const { category } = ctx.query;

        /** Getting Demo products */
        const demoEntities = await strapi.query( 'products' )
            .model.query( qb => {
                qb.select( 'id', 'name', 'slug', 'price', 'sale_price', 'ratings', 'reviews', 'is_hot', 'is_sale', 'is_out_of_stock', 'demoes', 'release_date', 'developer', 'publisher', 'game_mode', 'rated', 'until' )
                    .where( 'demoes', 'LIKE', '%demo' + demo )
                    .orWhere( 'demoes', 'LIKE', '%demo' + demo + ',%' )
            } )
            .fetchAll();
        let demoProducts = demoEntities.toJSON();

        for ( let i = 0; i < demoProducts.length; i++ ) {
            demoProducts[ i ].large_pictures = [];
            demoProducts[ i ].pictures = [];
            demoProducts[ i ].product_tags = [];
            demoProducts[ i ].product_brands = [];

            for ( let j = 0; j < demoProducts[ i ].variants.length; j++ ) {
                demoProducts[ i ].variants[ j ].size = [];
                demoProducts[ i ].variants[ j ].colors = [];
            }

            for ( let j = 0; j < demoProducts[ i ].small_pictures.length; j++ ) {
                var result = {};
                for ( let key in demoProducts[ i ].small_pictures[ j ] ) {
                    for ( let keyj in tmpPicture ) {
                        if ( key === keyj ) {
                            result[ key ] = demoProducts[ i ].small_pictures[ j ][ key ];
                        }
                    }
                }
                demoProducts[ i ].small_pictures[ j ] = result;
            }
            for ( let j = 0; j < demoProducts[ i ].product_categories.length; j++ ) {
                var result = {};
                for ( let key in demoProducts[ i ].product_categories[ j ] ) {
                    for ( let keyj in tmpCategory ) {
                        if ( key === keyj ) {
                            result[ key ] = demoProducts[ i ].product_categories[ j ][ key ];
                        }
                    }
                }
                demoProducts[ i ].product_categories[ j ] = result;
            }
        }

        /** Getting Featured Products */
        let tmpProducts = [ ...demoProducts ];
        let featuredProducts = tmpProducts.sort( function ( a, b ) {
            var featuredA = ( a.is_hot === true ? 1 : 0 );
            var featuredB = ( b.is_hot === true ? 1 : 0 );
            if ( featuredA < featuredB ) {
                return 1;
            } else if ( featuredA === featuredB ) {
                return 0;
            } else {
                return -1;
            }
        } );

        /** Getting Demo product's Category List */
        let categoryList = [];

        categoryList = await strapi.query( 'product-categories' )
            .model.query( qb => {
                qb.select( 'id', 'name', 'slug', 'parent_name', 'demoes' )
                    .where( 'demoes', 'LIKE', '%demo' + demo )
                    .orWhere( 'demoes', 'LIKE', '%demo' + demo + ',%' )
            } )
            .fetchAll();

        categoryList = categoryList.toJSON();

        for ( let i = 0; i < categoryList.length; i++ ) {
            categoryList[ i ].products = [];
        }

        categoryList.sort( function ( a, b ) {
            var nameA = !a.parent_name ? a.name : a.parent_name;
            var nameB = !b.parent_name ? b.name : b.parent_name;
            if ( nameA > nameB ) {
                return 1;
            }
            else if ( nameA < nameB ) {
                return -1;
            }
            return 0;
        } )

        let counts = Array( categoryList.length ).fill( 0 );

        for ( let i = 0; i < demoProducts.length; i++ ) {
            for ( let j = 0; j < demoProducts[ i ].product_categories.length; j++ ) {
                for ( let k = 0; k < categoryList.length; k++ ) {
                    if ( demoProducts[ i ].product_categories[ j ].slug === categoryList[ k ].slug ) {
                        counts[ k ]++;
                    }
                }

                let flag1 = true;
                let flag2 = true;

                for ( let k = 0; k < j; k++ ) {
                    if ( ( demoProducts[ i ].product_categories[ j ].parent_name === demoProducts[ i ].product_categories[ k ].parent_name ) && demoProducts[ i ].product_categories[ k ].parent_name !== null )
                        flag1 = false;
                }

                for ( let k = 0; k < demoProducts[ i ].product_categories.length; k++ ) {
                    if ( ( demoProducts[ i ].product_categories[ j ].parent_name === demoProducts[ i ].product_categories[ k ].name ) && ( j !== k ) && ( demoProducts[ i ].product_categories[ j ].parent_name !== null ) ) {
                        flag2 = false;
                    }
                }

                if ( flag1 && flag2 ) {
                    for ( let k = 0; k < categoryList.length; k++ ) {
                        if ( demoProducts[ i ].product_categories[ j ].parent_name === categoryList[ k ].name ) {
                            counts[ k ]++;
                        }
                    }
                }
            }
        }

        /** Getting Demo's Products maximum same parent depth and target */
        let depthList = [];
        let categoryGroup = [];

        for ( let i = 0; i < categoryList.length; i++ ) {
            if ( categoryList[ i ].parent_name ) {
                let tmp = categoryList[ i ].parent_name.concat( ',' );
                tmp = tmp.concat( categoryList[ i ].name );
                categoryGroup.push( tmp.split( ',' ) );
            }
            else {
                categoryGroup.push( [ categoryList[ i ].name ] );
            }
        }

        for ( let i = 0; i < categoryGroup.length; i++ ) {
            let depthListItem = {
                "target": [],
                "value": ""
            };
            let count = 0;
            for ( let j = 0; j < i; j++ ) {
                let tmp = 0;
                for ( ; tmp < categoryGroup[ j ].length; tmp++ ) {
                    if ( categoryGroup[ j ][ tmp ] !== categoryGroup[ i ][ tmp ] ) break;
                }

                if ( tmp > count ) {
                    depthListItem.target = [];
                    count = tmp;
                    for ( let k = 0; k < tmp; k++ ) {
                        depthListItem.target.push( categoryGroup[ j ][ k ] )
                    }
                }
            }
            depthListItem.value = count;
            depthList.push( depthListItem );
        }

        /** Getting Sidebar's List */
        let sidebarList = [];
        for ( let i = 0; i < categoryList.length; i++ ) {
            let tmp = {
                "id": -1,
                "name": "",
                "slug": "",
                "children": [],
                "disabled": true,
                "counts": 0
            };
            if ( !categoryList[ i ].parent_name ) {
                tmp.id = categoryList[ i ].id;
                tmp.name = categoryList[ i ].name;
                tmp.slug = categoryList[ i ].slug;
                tmp.children = [];
                tmp.counts = counts[ i ];
                let flag = false;
                let index = -1;
                for ( let j = 0; j < sidebarList.length; j++ ) {
                    if ( sidebarList[ j ].slug === tmp.slug ) {
                        flag = true;
                        index = j;
                    }
                }
                if ( !flag ) sidebarList.push( tmp );
                else {
                    sidebarList[ index ].counts += tmp.counts;
                }
            } else {
                let parents = categoryList[ i ].parent_name;
                parents = parents.split( ',' );

                tmp.id = categoryList[ i ].id;
                tmp.name = categoryList[ i ].name;
                tmp.slug = categoryList[ i ].slug;
                tmp.children = [];
                tmp.counts = counts[ i ];

                for ( let j = parents.length - depthList[ i ].value - 1; j >= 0; j-- ) {
                    let tmp1 = {
                        "id": -1,
                        "name": "",
                        "slug": "",
                        "children": [],
                        "disabled": true,
                        "counts": 0
                    };

                    tmp1.name = parents[ j ];
                    let parentCategory = parents[ j ];
                    let grandParentCategory = "";
                    if ( j === 0 ) grandParentCategory = null;
                    else {
                        for ( let k = 0; k < j; k++ ) {
                            grandParentCategory = grandParentCategory.concat( parents[ k ] );
                            if ( k + 1 !== j ) grandParentCategory = grandParentCategory.concat( ',' );
                        }
                    }

                    let parentSlug = await strapi.query( 'product-categories' )
                        .model.query( qb => {
                            qb.select( 'id', 'name', 'slug', 'parent_name' )
                                .where( 'parent_name', grandParentCategory )
                                .where( 'name', parentCategory )
                        } ).fetch();

                    parentSlug = parentSlug.toJSON();

                    tmp1.id = parentSlug.id;
                    tmp1.slug = parentSlug.slug;
                    tmp1.children.push( tmp );
                    tmp = tmp1;
                }

                let path = [];
                let checkList = sidebarList;
                let target = sidebarList;

                for ( let j = 0; j < depthList[ i ].value; j++ ) {
                    checkList.map( ( item, index ) => {
                        if ( depthList[ i ].target[ j ] === item.name ) {
                            path.push( index );
                            target = item.children;
                        }
                    } )
                    checkList = target;
                }
                if ( path.length === 1 ) {
                    sidebarList[ path[ 0 ] ].children.push( tmp );
                } else if ( path.length === 2 ) {
                    sidebarList[ path[ 0 ] ].children[ path[ 1 ] ].children.push( tmp );
                } else if ( path.length === 3 ) {
                    sidebarList[ path[ 0 ] ].children[ path[ 1 ] ].children[ path[ 2 ] ].children.push( tmp );
                } else {
                    sidebarList.push( tmp );
                }
                /**
                 * You Can add more line if you want to make category list's depth more bigger.
                 */
            }
        }

        return { 'sidebarList': sidebarList, 'featuredProducts': featuredProducts.slice( 0, 3 ) };
    },
    async findProductSidebarList ( ctx ) {
        const { demo } = ctx.query;

        /** Getting Demo product's Category List */
        let categoryList = [];

        categoryList = await strapi.query( 'product-categories' )
            .model.query( qb => {
                qb.select( 'id', 'name', 'slug', 'parent_name', 'demoes' )
                    .where( 'demoes', 'LIKE', '%demo' + demo )
                    .orWhere( 'demoes', 'LIKE', '%demo' + demo + ',%' )
            } )
            .fetchAll();

        categoryList = categoryList.toJSON();
        for ( let i = 0; i < categoryList.length; i++ ) {
            categoryList[ i ].products = [];
        }

        categoryList.sort( function ( a, b ) {
            var nameA = !a.parent_name ? a.name : a.parent_name;
            var nameB = !b.parent_name ? b.name : b.parent_name;
            if ( nameA > nameB ) {
                return 1;
            }
            else if ( nameA < nameB ) {
                return -1;
            }
            return 0;
        } )

        /** Getting Demo's Products maximum same parent depth and target */
        let depthList = [];
        let categoryGroup = [];

        for ( let i = 0; i < categoryList.length; i++ ) {
            if ( categoryList[ i ].parent_name ) {
                let tmp = categoryList[ i ].parent_name.concat( ',' );
                tmp = tmp.concat( categoryList[ i ].name );
                categoryGroup.push( tmp.split( ',' ) );
            }
            else {
                categoryGroup.push( [ categoryList[ i ].name ] );
            }
        }

        for ( let i = 0; i < categoryGroup.length; i++ ) {
            let depthListItem = {
                "target": [],
                "value": ""
            };
            let count = 0;
            for ( let j = 0; j < i; j++ ) {
                let tmp = 0;
                for ( ; tmp < categoryGroup[ j ].length; tmp++ ) {
                    if ( categoryGroup[ j ][ tmp ] !== categoryGroup[ i ][ tmp ] ) break;
                }

                if ( tmp > count ) {
                    depthListItem.target = [];
                    count = tmp;
                    for ( let k = 0; k < tmp; k++ ) {
                        depthListItem.target.push( categoryGroup[ j ][ k ] )
                    }
                }
            }
            depthListItem.value = count;
            depthList.push( depthListItem );
        }

        /** Getting Sidebar's List */
        let sidebarList = [];
        for ( let i = 0; i < categoryList.length; i++ ) {
            let tmp = {
                "id": -1,
                "name": "",
                "slug": "",
                "children": [],
                "disabled": true
            };
            if ( !categoryList[ i ].parent_name ) {
                tmp.id = categoryList[ i ].id;
                tmp.name = categoryList[ i ].name;
                tmp.slug = categoryList[ i ].slug;
                tmp.children = [];
                let flag = false;
                for ( let j = 0; j < sidebarList.length; j++ ) {
                    if ( sidebarList[ j ].slug === tmp.slug ) {
                        flag = true;
                    }
                }
                if ( !flag ) sidebarList.push( tmp );
            } else {
                let parents = categoryList[ i ].parent_name;
                parents = parents.split( ',' );

                tmp.id = categoryList[ i ].id;
                tmp.name = categoryList[ i ].name;
                tmp.slug = categoryList[ i ].slug;
                tmp.children = [];

                for ( let j = parents.length - depthList[ i ].value - 1; j >= 0; j-- ) {
                    let tmp1 = {
                        "id": -1,
                        "name": "",
                        "slug": "",
                        "children": [],
                        "disabled": true
                    };

                    tmp1.name = parents[ j ];
                    let parentCategory = parents[ j ];
                    let grandParentCategory = "";
                    if ( j === 0 ) grandParentCategory = null;
                    else {
                        for ( let k = 0; k < j; k++ ) {
                            grandParentCategory = grandParentCategory.concat( parents[ k ] );
                            if ( k + 1 !== j ) grandParentCategory = grandParentCategory.concat( ',' );
                        }
                    }

                    let parentSlug = await strapi.query( 'product-categories' )
                        .model.query( qb => {
                            qb.select( 'id', 'name', 'slug', 'parent_name' )
                                .where( 'parent_name', grandParentCategory )
                                .where( 'name', parentCategory )
                        } ).fetch();

                    parentSlug = parentSlug.toJSON();

                    tmp1.id = parentSlug.id;
                    tmp1.slug = parentSlug.slug;
                    tmp1.children.push( tmp );
                    tmp = tmp1;
                }

                let path = [];
                let checkList = sidebarList;
                let target = sidebarList;

                for ( let j = 0; j < depthList[ i ].value; j++ ) {
                    checkList.map( ( item, index ) => {
                        if ( depthList[ i ].target[ j ] === item.name ) {
                            path.push( index );
                            target = item.children;
                        }
                    } )
                    checkList = target;
                }

                if ( path.length === 1 ) {
                    sidebarList[ path[ 0 ] ].children.push( tmp );
                } else if ( path.length === 2 ) {
                    sidebarList[ path[ 0 ] ].children[ path[ 1 ] ].children.push( tmp );
                } else if ( path.length === 3 ) {
                    sidebarList[ path[ 0 ] ].children[ path[ 1 ] ].children[ path[ 2 ] ].children.push( tmp );
                } else {
                    sidebarList.push( tmp );
                }
                /**
                 * You Can add more line if you want to make category list's depth more bigger.
                 */
            }
        }

        return { 'sidebarList': sidebarList };
    },
    async findFeaturedProducts ( ctx ) {
        const { demo } = ctx.query;

        let demoProducts = await strapi.query( 'products' )
            .model.query( qb => {
                qb.select( 'id', 'name', 'slug', 'price', 'sale_price', 'short_description', 'stock', 'ratings', 'reviews', 'sale_count', 'is_hot', 'is_sale', 'is_out_of_stock', 'demoes', 'release_date', 'developer', 'publisher', 'game_mode', 'rated', 'until' )
                qb.where( 'demoes', 'LIKE', '%demo' + demo )
                    .orWhere( 'demoes', 'LIKE', '%demo' + demo + ',%' )
            } )
            .fetchAll();
        demoProducts = demoProducts.toJSON();

        var tmpPicture = {
            "id": 1,
            "width": 1,
            "height": 1,
            "url": ''
        }
        var tmpCategory = {
            "id": 1,
            "name": '',
            "parent_name": 1,
            "demoes": '',
            "slug": ''
        }

        for ( let i = 0; i < demoProducts.length; i++ ) {
            for ( let j = 0; j < demoProducts[ i ].small_pictures.length; j++ ) {
                var result = {};
                for ( let key in demoProducts[ i ].small_pictures[ j ] ) {
                    for ( let keyj in tmpPicture ) {
                        if ( key === keyj ) {
                            result[ key ] = demoProducts[ i ].small_pictures[ j ][ key ];
                        }
                    }
                }
                demoProducts[ i ].small_pictures[ j ] = result;
            }
            demoProducts[ i ].pictures = [];
            demoProducts.large_pictures = [];

            for ( let j = 0; j < demoProducts[ i ].product_categories.length; j++ ) {
                var result = {};
                for ( let key in demoProducts[ i ].product_categories[ j ] ) {
                    for ( let keyj in tmpCategory ) {
                        if ( key === keyj ) {
                            result[ key ] = demoProducts[ i ].product_categories[ j ][ key ];
                        }
                    }
                }
                demoProducts[ i ].product_categories[ j ] = result;
            }
        }

        let featuredProducts = demoProducts.sort( function ( a, b ) {
            var featuredA = ( a.is_hot === true ? 1 : 0 );
            var featuredB = ( b.is_hot === true ? 1 : 0 );
            if ( featuredA < featuredB ) {
                return 1;
            } else if ( featuredA === featuredB ) {
                return 0;
            } else {
                return -1;
            }
        } );
        featuredProducts = featuredProducts.slice( 0, 3 );

        return { 'featuredProducts': featuredProducts };
    },
    async test ( ctx ) {
        const { demo } = ctx.query
        let flag = 'false';
        if ( ctx.query.category ) flag = ctx.query.category;

        if ( flag === 'true' ) {
            let categoryList = [];

            categoryList = await strapi.query( 'product-categories' )
                .model.query( qb => {
                    qb.select( 'id', 'name', 'slug', 'parent_name', 'demoes' )
                        .where( 'demoes', 'LIKE', '%demo' + demo )
                        .orWhere( 'demoes', 'LIKE', '%demo' + demo + ',%' )
                } )
                .fetchAll();

            categoryList = categoryList.toJSON();

            for ( let i = 0; i < categoryList.length; i++ ) {
                categoryList[ i ].products = [];
            }

            return categoryList;
        }

        let product = await strapi.query( 'products' )
            .model.query( qb => {
                qb.select( 'id', 'name', 'slug', 'price', 'sale_price', 'short_description', 'stock', 'ratings', 'reviews', 'sale_count', 'is_new', 'is_hot', 'is_sale', 'is_out_of_stock', 'demoes', 'release_date', 'developer', 'publisher', 'game_mode', 'rated', 'until' )
                qb.where( 'demoes', 'LIKE', '%demo' + demo )
                    .orWhere( 'demoes', 'LIKE', '%demo' + demo + ',%' )
                // .where( 'id', '>', 449 )
            } )
            .fetchAll();
        product = product.toJSON();

        // return product;
        // return product.large_pictures[ 0 ];

        var tmpPicture = {
            "id": 1,
            "width": 1,
            "height": 1,
            "url": ''
        }
        var tmpCategory = {
            "id": 1,
            "name": '',
            "parent_name": 1,
            "demoes": '',
            "slug": ''
        }

        for ( let i = 0; i < product.length; i++ ) {
            for ( let j = 0; j < product[ i ].small_pictures.length; j++ ) {
                var result = {};
                for ( let key in product[ i ].small_pictures[ j ] ) {
                    for ( let keyj in tmpPicture ) {
                        if ( key === keyj ) {
                            result[ key ] = product[ i ].small_pictures[ j ][ key ];
                        }
                    }
                }
                product[ i ].small_pictures[ j ] = result;
            }

            for ( let j = 0; j < product[ i ].pictures.length; j++ ) {
                var result = {};
                for ( let key in product[ i ].pictures[ j ] ) {
                    for ( let keyj in tmpPicture ) {
                        if ( key === keyj ) {
                            result[ key ] = product[ i ].pictures[ j ][ key ];
                        }
                    }
                }
                product[ i ].pictures[ j ] = result;
            }

            for ( let j = 0; j < product[ i ].large_pictures.length; j++ ) {
                var result = {};
                for ( let key in product[ i ].large_pictures[ j ] ) {
                    for ( let keyj in tmpPicture ) {
                        if ( key === keyj ) {
                            result[ key ] = product[ i ].large_pictures[ j ][ key ];
                        }
                    }
                }
                product[ i ].large_pictures[ j ] = result;
            }

            for ( let j = 0; j < product[ i ].product_categories.length; j++ ) {
                var result = {};
                for ( let key in product[ i ].product_categories[ j ] ) {
                    for ( let keyj in tmpCategory ) {
                        if ( key === keyj ) {
                            result[ key ] = product[ i ].product_categories[ j ][ key ];
                        }
                    }
                }
                product[ i ].product_categories[ j ] = result;
            }
        }
        return product;
    }
};