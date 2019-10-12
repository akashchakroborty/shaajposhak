import React from "react";
import { withRouter } from "react-router-dom";
import {
  MenuItemContainer,
  BackgroundImageContainer,
  ContentContainer,
  TitleStyle,
  SubtitleStyle
} from "./menu-item.styles";

const MenuItem = ({ title, imageUrl, size, history, match, linkUrl }) => {
  return (
    <MenuItemContainer
      size={size}
      onClick={() => history.push(`${match.url}${linkUrl}`)}
    >
      <BackgroundImageContainer
        imageUrl={imageUrl}
        className="background-image"
      />
      <ContentContainer>
        <TitleStyle>{title.toUpperCase()}</TitleStyle>
        <SubtitleStyle>SHOP NOW</SubtitleStyle>
      </ContentContainer>
    </MenuItemContainer>
  );
};

export default withRouter(MenuItem);
