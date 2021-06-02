import CreateChannelList from 'container/channel/Create';
import { EnumActionType, StateType, useListContext } from 'hooks/useList';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

// Type層
type ContainerProps = {
  channnelId: string;
};
type Props = {
  className?: string;
  modalIsOpen: boolean;
  ChannnelList: StateType[];
  CheckList: {
    listId: number;
    isChecked: boolean;
  }[];
  handleModalToggle: () => void;
  handleUpdateChannnleList: (list: StateType, isChecked: boolean) => void;
} & ContainerProps;

// DOM層
const Component: React.FC<Props> = (props) => {
  return (
    <div className={props.className}>
      <h2>リスト一覧</h2>
      <ul>
        {props.ChannnelList.map((list, index) => (
          <li key={index}>
            <input
              type="checkbox"
              name={`channelList${list.id}`}
              id={`channelList${list.id}`}
              value={list.id}
              checked={
                props.CheckList.find((v) => v.listId === list.id)?.isChecked
              }
              onChange={(e) =>
                props.handleUpdateChannnleList(list, e.target.checked)
              }
            />
            <label htmlFor={`channelList${list.id}`}>{list.listName}</label>
          </li>
        ))}
        <li>
          <CreateChannelList />
        </li>
      </ul>
    </div>
  );
};

//Style層
const StyledComponent = styled(Component)`
  ul {
    list-style: none;
  }
`;

//Container層
const Container: React.FC<ContainerProps> = (props) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [ChannnelList, dispacth] = useListContext();
  const [CheckList, setCheckList] = useState(
    ChannnelList.map((v) => ({
      listId: v.id,
      isChecked: v.channelIds.includes(props.channnelId) || false,
    }))
  );

  //チャンネルリスト更新
  useEffect(() => {
    const listIds = CheckList.map((v) => v.listId);
    const newListId = ChannnelList.find((v) => !listIds.includes(v.id))?.id;
    if (newListId) {
      setCheckList([...CheckList, { listId: newListId, isChecked: false }]);
    }
  }, [ChannnelList]);

  const handleModalToggle = () => {
    setIsOpen(!modalIsOpen);
  };

  //チェックボックス更新
  const handleUpdateChannnleList = (list: StateType, isChecked: boolean) => {
    //チェック更新
    setCheckList(
      CheckList.map((v) =>
        v.listId === list.id ? { listId: v.listId, isChecked: isChecked } : v
      )
    );

    //チャンネル登録
    if (isChecked !== undefined) {
      dispacth({
        type: EnumActionType.Update,
        payload: {
          state: {
            id: list.id,
            listName: list.listName,
            discription: list.discription,
            channelIds: isChecked
              ? [...list.channelIds, props.channnelId]
              : list.channelIds.filter((id) => !id.includes(props.channnelId)),
          },
        },
      });
    }
  };

  return (
    <StyledComponent
      {...props}
      modalIsOpen={modalIsOpen}
      ChannnelList={ChannnelList}
      CheckList={CheckList}
      handleModalToggle={handleModalToggle}
      handleUpdateChannnleList={handleUpdateChannnleList}
    />
  );
};

export default Container;
