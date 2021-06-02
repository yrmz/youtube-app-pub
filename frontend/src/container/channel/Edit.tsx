import { Confirm } from 'component/utils/confirm';
import { EnumActionType, StateType, useListContext } from 'hooks/useList';
import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';

// Type層
type ContainerProps = {
  listId: number;
};
type Props = {
  className?: string;
} & ContainerProps;

// DOM層
const Component: React.FC<Props> = (props) => {
  const [list, dispatch] = useListContext();
  const [listName, setListName] = useState("");
  const [discription, setDiscription] = useState("");
  const history = useHistory();

  useEffect(() => {
    handleRefleshList(props.listId);
  }, [props.listId]);

  const handleUpdateList = (listId: number) => {
    const channelIds = list.find((v) => v.id === listId)?.channelIds || [];

    dispatch({
      type: EnumActionType.Update,
      payload: {
        state: {
          id: listId,
          listName: listName,
          discription: discription,
          channelIds: channelIds,
        },
      },
    });
  };

  const handleRefleshList = (listId: number) => {
    const channel = list.find((v) => v.id === listId);
    setListName(channel?.listName || "");
    setDiscription(channel?.discription || "");
  };

  const handleDeleteList = (listId: number) => {
    dispatch({
      type: EnumActionType.Delete,
      payload: {
        state: {
          id: listId,
          listName: "",
          discription: "",
          channelIds: [],
        },
      },
    });

    //一覧に戻る
    history.push("/");
  };

  return (
    <div className={props.className}>
      <Form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          handleUpdateList(props.listId);
        }}
      >
        <Form.Group controlId="ListName">
          <Form.Label>リスト名</Form.Label>
          <Form.Control
            type="text"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="Discription">
          <Form.Label>概要</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            value={discription}
            onChange={(e) => setDiscription(e.target.value)}
          />
        </Form.Group>
        <div className="text-right form-footer">
          <Link to="#" onClick={() => handleUpdateList(props.listId)}>
            保存
          </Link>
          <Link to="#" onClick={() => handleRefleshList(props.listId)}>
            リセット
          </Link>
        </div>
      </Form>
      <Confirm
        className="text-center"
        label="削除"
        onClickOk={() => handleDeleteList(props.listId)}
      >
        チャンネルリストを削除します。
      </Confirm>
    </div>
  );
};

//Style層
const StyledComponent = styled(Component)`
  .form {
    margin-bottom: 20px;
  }
  .form-footer a {
    margin-right: 12px;
  }
`;

//Container層
const Container: React.FC<ContainerProps> = (props) => {
  return <StyledComponent {...props} />;
};

export default Container;
