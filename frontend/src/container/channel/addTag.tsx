import { PrivateContext } from 'hooks/context/privateContext';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Form } from 'react-bootstrap';
import styled from 'styled-components';

type ContainerProps = {
  className?: string;
  channelId: string;
  channelTags: { tagId: number; tagName: string }[];
  channelTagsService: TChannelTagsService;
};

const Container: React.FC<ContainerProps> = (props) => {
  const context = useContext(PrivateContext);
  const [tags] = context.useTags;
  const handleChange = (checked: boolean, tagId: number) => {
    if (checked) {
      props.channelTagsService.addChannelTag(tagId, props.channelId);
    } else {
      props.channelTagsService.deleteChannelTag(tagId, props.channelId);
    }
  };

  return (
    <div className={props.className}>
      <ul>
        {tags.map((v, idx) => (
          <CheckBox
            tagId={v.id}
            key={idx}
            lable={v.name}
            checked={props.channelTags.map((v) => v.tagId).includes(v.id)}
            onChange={handleChange}
          />
        ))}
      </ul>
    </div>
  );
};

const CheckBox: React.FC<{
  tagId: number;
  lable: string;
  checked: boolean;
  onChange: (checked: boolean, tagId: number) => void;
}> = (props) => {
  const [checked, setChecked] = useState(props.checked);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      props.onChange(checked, props.tagId);
    }
  }, [checked]);

  return (
    <Form.Group className="mb-3" controlId={`checkbox_${props.tagId}`}>
      <Form.Check
        type="checkbox"
        label={props.lable}
        checked={checked}
        onChange={() => setChecked((c) => !c)}
      />
    </Form.Group>
  );
};

export const AddTag = styled(Container)`
  ul {
    list-style: none;
  }
`;
