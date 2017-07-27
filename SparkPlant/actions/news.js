import * as types from './types';

export function setCurrentNews(news)
{
    return {
        type : types.SET_CURRENT_NEWS,
        news : news,
    }
}