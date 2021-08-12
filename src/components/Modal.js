import { Modal as SemanticModal, Button, Icon } from "semantic-ui-react";

const Modal = ({ content, setOpen, setClose, isModalOpen }) => {
  return (
    <SemanticModal
      basic
      open={isModalOpen}
      onClose={setClose}
      onOpen={setOpen}
      size="large"
    >
      <SemanticModal.Content>
        <ul style={{ fontSize: "20px" }}>
          {Object.keys(content).map((key, index) => {
            return (
              <li>
                {key} : {content[key]}
              </li>
            );
          })}
        </ul>
      </SemanticModal.Content>
      <SemanticModal.Actions>
        <Button color="green" inverted onClick={setClose}>
          <Icon name="thumbs up" /> OK
        </Button>
      </SemanticModal.Actions>
    </SemanticModal>
  );
};

export default Modal;
