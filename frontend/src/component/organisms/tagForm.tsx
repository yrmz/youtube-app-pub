import { Confirm } from 'component/utils/confirm';
import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import styled from 'styled-components';

type Props = {
  className?: string;
  tagDetail?: TStateTag;
  handleEditTag: (req: {
    tagId?: number;
    name: string;
    description: string;
  }) => void;
  handleDeleteTag: (id: number) => void;
};

type Inputs = {
  name: string;
  description: string;
};

const Component: React.FC<Props> = (props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      name: props.tagDetail?.name,
      description: props.tagDetail?.description,
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) =>
    props.handleEditTag({
      tagId: props.tagDetail?.id,
      name: data.name,
      description: data.description,
    });

  return (
    <div className={props.className}>
      <Form className="form" onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="name">
          <Form.Label>リスト名</Form.Label>
          <Form.Control
            name="name"
            ref={register({ required: true, maxLength: 30 })}
          />
          {errors.name && <span>30文字以内で必ず入力してください。</span>}
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>概要</Form.Label>
          <Form.Control
            name="description"
            ref={register({ maxLength: 300 })}
            as="textarea"
            rows={5}
          />
          {errors.description && <span>最大300文字です。</span>}
        </Form.Group>
        <div className="text-right form-footer">
          <Button variant="primary" type="submit">
            保存
          </Button>
          {props.tagDetail && (
            <div>
              <Confirm
                className="text-center"
                label="削除"
                onClickOk={() => props.handleDeleteTag(1)}
              >
                チャンネルリストを削除します。
              </Confirm>
            </div>
          )}
        </div>
      </Form>
    </div>
  );
};

export const TagForm = styled(Component)``;
