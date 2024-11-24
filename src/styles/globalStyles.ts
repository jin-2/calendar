import { css } from "@emotion/react";

const globalStyles = css`
  @import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard-dynamic-subset.min.css");

  a,
  abbr,
  acronym,
  address,
  article,
  aside,
  audio,
  b,
  big,
  blockquote,
  body,
  button,
  canvas,
  caption,
  cite,
  code,
  dd,
  del,
  details,
  dfn,
  div,
  dl,
  dt,
  em,
  embed,
  fieldset,
  figcaption,
  figure,
  footer,
  form,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  header,
  html,
  i,
  iframe,
  img,
  input,
  ins,
  kbd,
  label,
  legend,
  li,
  mark,
  menu,
  nav,
  object,
  ol,
  output,
  p,
  pre,
  q,
  ruby,
  s,
  samp,
  section,
  select,
  small,
  span,
  strike,
  strong,
  sub,
  summary,
  sup,
  table,
  tbody,
  td,
  textarea,
  tfoot,
  th,
  thead,
  time,
  tr,
  tt,
  u,
  ul,
  var,
  video {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  li,
  ol,
  ul {
    list-style: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  img {
    border: 0;
    vertical-align: top;
  }

  svg {
    vertical-align: top;
  }

  address,
  em {
    font-style: normal;
  }

  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  main,
  menu,
  nav,
  section,
  summary {
    display: block;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    border: 0;
    background: transparent;
    cursor: pointer;
  }

  input::-ms-clear {
    display: none;
  }

  body {
    font-family:
      "Pretendard Variable",
      Pretendard,
      -apple-system,
      BlinkMacSystemFont,
      system-ui,
      Roboto,
      "Helvetica Neue",
      "Segoe UI",
      "Apple SD Gothic Neo",
      "Noto Sans KR",
      "Malgun Gothic",
      "Apple Color Emoji",
      "Segoe UI Emoji",
      "Segoe UI Symbol",
      sans-serif;
    font-size: 13px;
    color: #333;
  }

  input[type="search"]::-webkit-search-cancel-button {
    appearance: none;
  }
`;

export default globalStyles;
