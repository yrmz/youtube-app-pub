import { AddBadge } from 'component/atoms/addBadge';
import { TagBadge } from 'component/atoms/tagBadge';
import { CustomModal } from 'component/utils/modal';
import { AddTag } from 'container/channel/addTag';
import React, { useState } from 'react';
import styled from 'styled-components';

type ContainerProps = {
  title: string;
  description: string;
  channelId: string;
  channelService: TYoutubeSubscriptionService;
  tags: { tagId: number; tagName: string }[];
};

const Container: React.FC<ContainerProps> = (props) => {
  const [showModal, setShow] = useState(false);
  const handleModalToggle = () => {
    setShow(!showModal);
  };

  return (
    <>
      <h3>
        <a href={`https://www.youtube.com/channel/${props.channelId}`}>
          {props.title}
        </a>
      </h3>
      <div className="description">{props.description}</div>
      <div>
        {props.tags.map((v, idx) => (
          <TagBadge
            key={idx}
            name={v.tagName}
            onClick={() =>
              props.channelService.deleteChannelTag(v.tagId, props.channelId)
            }
          />
        ))}
        <CustomModal
          label={<AddBadge />}
          showModal={showModal}
          handleModalToggle={handleModalToggle}
        >
          <AddTag
            channelId={props.channelId}
            channelTags={props.tags}
            channelService={props.channelService}
          />
        </CustomModal>
      </div>
    </>
  );
};

//Style層
export const List = styled(Container)``;
