import { EnumActionType, useListContext } from 'hooks/useList';
import React, { useState } from 'react';
import styled from 'styled-components';

// Type層
type ContainerProps = {};
type Props = {
  className?: string;
} & ContainerProps;

// DOM層
const Component: React.FC<Props> = (props) => {
  const [listName, setListName] = useState("");
  const [list, dispacth] = useListContext();
  const handdleAddList = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    if (!listName) {
      return;
    }

    const id = list.map((v) => v.id).reduce((v, c) => Math.max(v, c), 0) + 1;

    dispacth({
      type: EnumActionType.Create,
      payload: {
        state: {
          id: id,
          listName: listName,
          discription: "",
          channelIds: [],
        },
      },
    });
  };

  return (
    <div className={props.className}>
      <form
        onSubmit={(e) => {
          handdleAddList(e);
          setListName("");
        }}
      >
        <input
          type="text"
          value={listName}
          onChange={(e) => setListName(e.target.value)}
        ></input>
        <input type="submit" value="submit"></input>
      </form>
    </div>
  );
};

//Style層
const StyledComponent = styled(Component)``;

//Container層
const Container: React.FC<ContainerProps> = (props) => {
  return <StyledComponent {...props} />;
};

export default Container;
