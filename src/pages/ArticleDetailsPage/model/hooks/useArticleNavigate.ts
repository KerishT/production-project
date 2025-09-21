import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getArticleDetailsData } from '@/entities/Article';
import { getRouteArticles, getRouteArticleEdit } from '@/shared/const/router';

export function useArticleNavigate() {
    const navigate = useNavigate();
    const article = useSelector(getArticleDetailsData);

    const onBack = useCallback(() => {
        navigate(getRouteArticles());
    }, [navigate]);

    const onEdit = useCallback(() => {
        if (article?.id) {
            navigate(getRouteArticleEdit(article?.id));
        }
    }, [article?.id, navigate]);

    return {
        onBack,
        onEdit
    };
}
