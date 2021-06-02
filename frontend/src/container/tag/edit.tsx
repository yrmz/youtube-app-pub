import { TagForm } from 'component/organisms/tagForm';
import { CustomModal } from 'component/utils/modal';
import React, { useState } from 'react';
import styled from 'styled-components';

import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Type層
type ContainerProps = {
  className?: string;
  tagDetail: TStateTag;
  tagsService: TTagService;
};

//Container層
const Container: React.FC<ContainerProps> = (props) => {
  const [showModal, setShow] = useState(false);
  const handleModalToggle = () => setShow(!showModal);

  const handleEditTag = (req: {
    tagId?: number;
    name: string;
    description: string;
  }) => {
    props.tagsService.editTag({
      tagId: req.tagId,
      name: req.name,
      description: req.description,
    });
    handleModalToggle();
  };

  const handleDeleteTag = (tagId: number) => {
    props.tagsService.deleteTag(tagId);
    handleModalToggle();
  };

  return (
    <div className={props.className}>
      <CustomModal
        label={<FontAwesomeIcon icon={faEdit} size="1x" />}
        showModal={showModal}
        handleModalToggle={handleModalToggle}
      >
        <TagForm
          tagDetail={props.tagDetail}
          handleEditTag={handleEditTag}
          handleDeleteTag={() => handleDeleteTag(props.tagDetail.id)}
        />
      </CustomModal>
    </div>
  );
};

//Style層
export const TagEdit = styled(Container)`
  display: inline-block;
`;
