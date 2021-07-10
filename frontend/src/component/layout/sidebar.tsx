import { TagForm } from 'component/organisms/tagForm';
import { CustomModal } from 'component/utils/modal';
import { TagEdit } from 'container/tag/edit';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Type層
type Props = {
  className?: string;
  tags: TStateTag[];
  tagService: TTagService;
  showModal: boolean;
  handleModalToggle: () => void;
};

// DOM層
const Component: React.FC<Props> = (props) => {
  const handleEditTag = (req: {
    id?: number;
    name: string;
    description: string;
  }) => {
    props.tagService.editTag({ name: req.name, description: req.description });
    props.handleModalToggle();
  };

  return (
    <nav className={props.className}>
      <ul>
        <li>
          <Link to="/app">一覧</Link>
          <CustomModal
            label={<FontAwesomeIcon icon={faPlus} size="1x" />}
            showModal={props.showModal}
            handleModalToggle={props.handleModalToggle}
          >
            <TagForm handleEditTag={handleEditTag} handleDeleteTag={() => {}} />
          </CustomModal>
        </li>
        {props.tags.length > 0 &&
          props.tags.map((tag, idx) => (
            <li key={idx}>
              <Link to={`/app/list/${tag.id}`}>{tag.name}</Link>
              <TagEdit tagDetail={tag} tagsService={props.tagService} />
            </li>
          ))}
      </ul>
    </nav>
  );
};

//Style層
export const SideBar = styled(Component)`
  padding: 80px 0 0;
  position: fixed;

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
  li {
    display: flex;
    justify-content: space-between;
    width: 180px;
    margin: 2px 0;
    padding: 2px 15px;
    border-bottom: 1px solid #dcdcdc;
  }
  .label {
    padding: 0 5px;
  }
`;
