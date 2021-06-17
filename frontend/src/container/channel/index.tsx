import { useChannels } from 'hooks/backend/channel';
import { useChannelTags } from 'hooks/backend/channelTags';
import { useYoutubeChannelList } from 'hooks/youtube';
import React from 'react';
import { Col, Container as BsContainer, Image, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { List } from './list';

// Type層
type ContainerProps = {
  className?: string;
};

// DOM層
const Container: React.FC<ContainerProps> = (props) => {
  const { tagId } = useParams<{ tagId?: string }>();
  const [channelList, isLoading, getChannelList] = useYoutubeChannelList(tagId);
  const [, channelTagService] = useChannelTags(
    channelList.items.map((v) => v.channelId)
  );

  return (
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
                tags={v.tags}
                channelTagService={channelTagService}
              />
            </Col>
          </Row>
        ))}
      </BsContainer>
      <footer>
        {isLoading && <div>loading...</div>}
        {channelList.nextPageToken && !isLoading && (
          <Link to="#" onClick={() => getChannelList()}>
            さらに読み込む
          </Link>
        )}
      </footer>
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

  footer {
    text-align: center;
    margin: 50px 0;
  }

  a:link,
  a:visited,
  a:hover,
  a:active {
    color: inherit;
  }
`;
