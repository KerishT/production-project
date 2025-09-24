import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { Button as ButtonDeprecated } from '@/shared/ui/deprecated/Button';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynammicModuleLoader/DynamicModuleLoader';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { addCommentFormActions, addCommentFormReducer } from '../../model/slice/addCommentFormSlice';
import { getAddCommentFormText } from '../../model/selectors/addCommentFormSelectors';
import cls from './AddCommentForm.module.scss';
import { ToggleFeatures } from '@/shared/lib/features';
import { Input } from '@/shared/ui/redesigned/Input';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';

const reducers: ReducersList = {
    addCommentForm: addCommentFormReducer
};

export interface AddCommentFormProps {
    className?: string,
    onSendComment: (text: string) => void
}

const AddCommentForm = memo((props: AddCommentFormProps) => {
    const { className, onSendComment } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const text = useSelector(getAddCommentFormText);

    const onCommentTextChange = useCallback((value: string) => {
        dispatch(addCommentFormActions.setText(value));
    }, [dispatch]);

    const onSendHanlder = useCallback(() => {
        onSendComment(text || '');

        onCommentTextChange('');
    }, [onCommentTextChange, onSendComment, text]);

    return (
        <DynamicModuleLoader reducers={reducers}>
            <ToggleFeatures
                feature="isAppRedesigned"
                on={(
                    <Card padding="24" border="round" max>
                        <HStack
                            max
                            gap="16"
                            justify="between"
                            data-testid="AddCommentForm"
                            className={classNames(cls.AddCommentFormRedesigned, {}, [className])}
                        >
                            <Input
                                id="addCommentForm.Input"
                                className={cls.input}
                                placeholder={t('Enter the text of the comment')}
                                value={text}
                                onChange={onCommentTextChange}
                                data-testid="AddCommentForm.Input"
                            />

                            <Button
                                onClick={onSendHanlder}
                                data-testid="AddCommentForm.Button"
                            >
                                {t('Send')}
                            </Button>
                        </HStack>
                    </Card>
                )}
                off={(
                    <HStack
                        max
                        justify="between"
                        data-testid="AddCommentForm"
                        className={classNames(cls.AddCommentForm, {}, [className])}
                    >
                        <InputDeprecated
                            className={cls.input}
                            placeholder={t('Enter the text of the comment')}
                            value={text}
                            onChange={onCommentTextChange}
                            data-testid="AddCommentForm.Input"
                        />

                        <ButtonDeprecated
                            onClick={onSendHanlder}
                            data-testid="AddCommentForm.Button"
                        >
                            {t('Send')}
                        </ButtonDeprecated>
                    </HStack>
                )}
            />
        </DynamicModuleLoader>
    );
});

export default AddCommentForm;
