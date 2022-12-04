import styled from "@emotion/styled/macro";

export const ChatZone = styled.div`
  max-width: inherit;
  & .scrollBarDiv {
    width: 100%;
    height: 100%;
  }
`;

export const Section = styled.section`
  margin-top: 20px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`;

export const StickyHeader = styled.div`
  display: flex;
  justify-content: center;
  flex: 1;
  width: 100%;
  position: sticky;
  top: 14px;
  & span {
    font-weight: bold;
    font-size: 13px;
    height: 28px;
    line-height: 27px;
    padding: 0 16px;
    z-index: 2;
    box-shadow: 0 0 0 1px var(--saf-0), 0 1px 3px 0 rgba(0, 0, 0, 0.08);
    border-radius: 24px;
    position: relative;
    top: -13px;
    background: white;
    border: none;
    outline: none;
  }
`;
