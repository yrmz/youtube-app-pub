import { useChannels } from 'hooks/backend/channel';
import { useChannelTags } from 'hooks/backend/channelTags';
import { useYoutubeChannelList } from 'hooks/youtube';
import React from 'react';
import { Col, Container as BsContainer, Image, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { List } from './list';

// Type層
type ContainerProps = {
  className?: string;
};

// DOM層
const Container: React.FC<ContainerProps> = (props) => {
  const { tagId } = useParams<{ tagId?: string }>();
  const [channels] = useChannels(tagId || "");
  const [channelList, isLoading] = useYoutubeChannelList(
    channels?.channelIds,
    tagId
  );
  const [channelTags, channelTagService] = useChannelTags(
    channelList.items.map((v) => v.channelId)
  );

  return isLoading ? (
    <div>loading...</div>
  ) : (
    <div className={props.className}>
      <BsContainer>
        {channelList.items.map((v, idx) => (
          <Row key={idx} className="my-5">
            <Col lg={1}>
              <Image src={v.thumbnail} decoding="async" roundedCircle fluid />
            </Col>
            <Col>
              <List
                title={v.title}
                description={v.description}
                channelId={v.channelId}
                tags={
                  channelTags.find((c) => c.channelId === v.channelId)?.tags ||
                  []
                }
                channelTagService={channelTagService}
              />
            </Col>
          </Row>
        ))}
      </BsContainer>
    </div>
  );
};

//Style層
export const ChannelList = styled(Container)`
  .description {
    max-width: 800px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  a:link,
  a:visited,
  a:hover,
  a:active {
    color: inherit;
  }
`;
