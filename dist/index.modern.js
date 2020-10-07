import React, { useState, useEffect } from 'react';
import parse from 'html-react-parser';
import Moment from 'moment';
import 'moment/locale/de';

function Element(props) {
  const type = props.type;
  const data = props.data;
  const CustomTag = props.customTag ? `${props.customTag}` : `div`;
  const customId = props.customId;
  const customClass = props.customClass;

  const parseHeader = () => {
    if (typeof data.content.header !== undefined && data.content.header && type === 'header') return /*#__PURE__*/React.createElement(CustomTag, {
      className: customClass,
      id: customId
    }, /*#__PURE__*/React.createElement("span", null, parse(data.content.header)));
    if (data.content.shortcut && data.content.shortcut[0].content.header && type === 'header') return /*#__PURE__*/React.createElement(CustomTag, {
      className: customClass,
      id: customId
    }, /*#__PURE__*/React.createElement("span", null, parse(data.content.shortcut[0].content.header)));
    return null;
  };

  const parseSubHeader = () => {
    if (typeof data.content.subheader !== undefined && data.content.subheader && type === 'subheader') return /*#__PURE__*/React.createElement(CustomTag, {
      className: customClass,
      id: customId
    }, /*#__PURE__*/React.createElement("span", null, parse(data.content.subheader)));
    if (data.content.shortcut && data.content.shortcut[0].content.subheader && type === 'subheader') return /*#__PURE__*/React.createElement(CustomTag, {
      className: customClass,
      id: customId
    }, /*#__PURE__*/React.createElement("span", null, parse(data.content.shortcut[0].content.subheader)));
    return null;
  };

  const parseDate = () => {
    if (typeof data.content.date !== undefined && data.content.date && type === 'date') return /*#__PURE__*/React.createElement(CustomTag, {
      className: customClass,
      id: customId
    }, /*#__PURE__*/React.createElement("span", null, Moment.unix(data.content.date).format('DD. MMMM YYYY')));
    if (data.content.shortcut && data.content.shortcut[0].content.date && type === 'date') return /*#__PURE__*/React.createElement(CustomTag, {
      className: customClass,
      id: customId
    }, /*#__PURE__*/React.createElement("span", null, parse(data.content.shortcut[0].content.date)));
    return null;
  };

  const parseBodytext = () => {
    if (typeof data.content.bodytext === 'string' && type === 'bodytext') return /*#__PURE__*/React.createElement(CustomTag, null, parse(data.content.bodytext));

    if (typeof data.content.bodytext === 'object' && type === 'bodytext') {
      return /*#__PURE__*/React.createElement(React.Fragment, null);
    }

    if (data.content.shortcut && typeof data.content.shortcut[0].content.bodytext === 'string' && type === 'bodytext') return /*#__PURE__*/React.createElement(CustomTag, null, parse(data.content.shortcut[0].content.bodytext));
    return null;
  };

  const parseImage = () => {
    if (data.content.gallery.length > 0 && type === 'image') {
      const width = props.width;
      const height = props.height;
      const imageClass = props.imageClass;
      let imageCollection = [];

      for (var image of data.content.gallery) {
        let imageUrl = image.publicUrl;
        let search = process.env.REACT_APP_API_BASE_URL;
        let replace = process.env.REACT_APP_API_BASE_URL + 'resize/image/';
        imageCollection.push(imageUrl.replace(search, replace) + '/' + width + '/' + height);
      }

      return imageCollection.map((image, index) => /*#__PURE__*/React.createElement("img", {
        src: image,
        alt: "",
        key: index,
        className: imageClass
      }));
    } else {
      return null;
    }
  };

  const parseTable = () => {
    let dataRows = [];
    data.content.bodytext.forEach(function (rows, rowKey) {
      let dataCells = [];
      rows.forEach(function (cell, cellKey) {
        dataCells.push( /*#__PURE__*/React.createElement("td", {
          key: cellKey,
          className: "table__cell",
          role: "cell"
        }, /*#__PURE__*/React.createElement("span", {
          className: "table__label",
          "aria-hidden": "true"
        }, cellKey), cell));
      });
      dataRows.push( /*#__PURE__*/React.createElement("tr", {
        key: rowKey,
        className: "table__row"
      }, dataCells));
    });
    return /*#__PURE__*/React.createElement("table", {
      className: "table table--expanded@xs position-relative z-index-1 width-100% js-table"
    }, /*#__PURE__*/React.createElement("tbody", {
      className: "table__body"
    }, dataRows));
  };

  const parseDownload = () => {
    if (data.content.media.length > 0 && type === 'upload') {
      const width = props.width;
      const height = 0;
      let mediaCollection = [];

      for (var media of data.content.media) {
        let mediaUrl = media.publicUrl;
        let search = process.env.REACT_APP_API_BASE_URL;
        let replace = process.env.REACT_APP_API_BASE_URL + 'resize/image/';
        mediaCollection.push({
          title: media.properties.title ? media.properties.title : '',
          description: media.properties.description ? media.properties.description : '',
          filename: media.properties.filename ? media.properties.filename : '',
          url: mediaUrl.replace(search, replace) + '/' + width + '/' + height,
          publicUrl: media.publicUrl
        });
      }

      return /*#__PURE__*/React.createElement("div", {
        className: "grid gap-sm",
        id: customId
      }, mediaCollection.map((media, index) => /*#__PURE__*/React.createElement("div", {
        className: 'thumbnail ' + customClass,
        key: index
      }, /*#__PURE__*/React.createElement("a", {
        href: media.publicUrl,
        className: "text-decoration-none color-contrast-medium",
        alt: media.description,
        target: "blank"
      }, /*#__PURE__*/React.createElement("div", {
        className: "grid gap-sm margin-bottom-sm"
      }, /*#__PURE__*/React.createElement("div", {
        className: "col-3 col-4@md"
      }, /*#__PURE__*/React.createElement("img", {
        src: media.url,
        alt: media.description,
        key: index
      })), /*#__PURE__*/React.createElement("div", {
        className: "col-12 col-8@md text-component"
      }, media.filename && /*#__PURE__*/React.createElement("div", {
        className: "filename_url"
      }, media.filename), media.title && /*#__PURE__*/React.createElement("div", {
        className: "filename_title text-sm margin-top-sm"
      }, media.title), media.description && /*#__PURE__*/React.createElement("div", {
        className: "filename_description text-sm margin-top-sm"
      }, media.description)))))));
    } else {
      return null;
    }
  };

  let out = null;

  switch (data.type + '-' + type) {
    case 'minimal-header':
      out = parseHeader();
      break;

    case 'minimal-subheader':
      out = parseSubHeader();
      break;

    case 'minimal-date':
      out = parseDate();
      break;

    case 'minimal-bodytext':
      out = parseBodytext();
      break;

    case 'minimal-image':
      out = parseImage();
      break;

    case 'minimal-upload':
      out = null;
      break;

    case 'shortcut-header':
      out = parseHeader();
      break;

    case 'shortcut-subheader':
      out = parseSubHeader();
      break;

    case 'shortcut-date':
      out = parseDate();
      break;

    case 'shortcut-bodytext':
      out = parseBodytext();
      break;

    case 'shortcut-image':
      out = parseImage();
      break;

    case 'shortcut-upload':
      out = null;
      break;

    case 'table-header':
      out = parseHeader();
      break;

    case 'table-subheader':
      out = parseSubHeader();
      break;

    case 'table-date':
      out = parseDate();
      break;

    case 'table-bodytext':
      out = parseTable();
      break;

    case 'table-image':
      out = null;
      break;

    case 'table-upload':
      out = null;
      break;

    case 'uploads-header':
      out = parseHeader();
      break;

    case 'uploads-subheader':
      out = parseSubHeader();
      break;

    case 'uploads-date':
      out = parseDate();
      break;

    case 'uploads-bodytext':
      out = null;
      break;

    case 'uploads-image':
      out = null;
      break;

    case 'uploads-upload':
      out = parseDownload();
      break;

    default:
      console.log(`Sorry, No ${data.type} for ${type} type found for rendering.`);
  }

  return out;
}

function Accordion(props) {
  const colPos = props.colPos ? props.colPos : null;
  if (!colPos) console.log('Error: ColPos not defined!');
  const contents = props.contents ? props.contents[colPos] : null;
  const sectionClass = props.sectionClass ? props.sectionClass : null;
  const sectionId = props.sectionId ? props.sectionId : null;
  const [accordionActive, setAccordionState] = useState(-1);

  const handleAccordionClick = i => {
    if (accordionActive === i) {
      setAccordionState(-1);
    } else {
      setAccordionState(i);
    }
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("section", {
    className: 'accordion_section ' + sectionClass,
    id: sectionId
  }, /*#__PURE__*/React.createElement("div", {
    className: "container max-width-adaptive-lg"
  }, /*#__PURE__*/React.createElement("ul", {
    className: "accordion js-accordion",
    "data-animation": "on",
    "data-multi-items": "on"
  }, contents && contents.length && contents.map((item, index) => /*#__PURE__*/React.createElement("li", {
    className: `accordion__item  js-accordion__item ${accordionActive === index ? 'accordion__item--is-open' : ''}`,
    onClick: () => handleAccordionClick(index),
    key: index
  }, /*#__PURE__*/React.createElement("button", {
    className: "reset accordion__header padding-y-sm padding-x-md js-tab-focus",
    type: "button"
  }, /*#__PURE__*/React.createElement(Element, {
    data: item,
    type: "header",
    customClass: "text-md"
  }), /*#__PURE__*/React.createElement("svg", {
    className: "icon accordion__icon-arrow no-js:is-hidden",
    viewBox: "0 0 16 16",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("g", {
    className: "icon__group",
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "square",
    strokeMiterlimit: "10"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M2 2l12 12"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M14 2L2 14"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "accordion__panel js-accordion__panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-component padding-top-xxxs padding-x-md padding-bottom-md"
  }, /*#__PURE__*/React.createElement(Element, {
    data: item,
    type: "bodytext"
  })))))))));
}

function ImportScript(url, id) {
  const existingScript = document.getElementById(id);

  if (existingScript) {
    existingScript.remove();
  }

  const script = document.createElement('script');
  script.src = url;
  script.id = id;
  document.body.appendChild(script);
}

function Header(props) {
  const Logo = props.logo;
  const scriptFile = props.scriptFile;
  const scriptId = props.scriptId;
  const showNavigation = props.showNavigation ? props.showNavigation : null;
  const menuItems = props.menuItems ? props.menuItems : null;
  const accessibilityName = props.accessibilityName ? props.accessibilityName : 'Menu';
  useEffect(() => {
    if (showNavigation) {
      ImportScript(scriptFile, scriptId);
    }
  }, [showNavigation, scriptFile, scriptId]);

  const handleHeaderChange = evt => {
    evt.preventDefault();
    const elementId = evt.target.hash.replace('#', '');
    const scrollPoint = document.getElementById(elementId);
    const yOffset = -125;
    const y = scrollPoint.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({
      top: y,
      behavior: 'smooth'
    });
  };

  return /*#__PURE__*/React.createElement("header", {
    className: "header position-fixed opacity-90% js-header "
  }, /*#__PURE__*/React.createElement("div", {
    className: "header__container container max-width-lg"
  }, /*#__PURE__*/React.createElement("div", {
    className: "header__logo"
  }, /*#__PURE__*/React.createElement(Logo, null)), showNavigation && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
    className: "btn btn--subtle header__trigger js-header__trigger padding-bottom-sm padding-top-sm padding-right-xxs padding-left-sm shadow-none",
    "aria-label": "Toggle menu",
    "aria-expanded": "false",
    "aria-controls": "header-nav"
  }, /*#__PURE__*/React.createElement("i", {
    className: "header__trigger-icon",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("span", {
    className: "sr-only"
  }, accessibilityName)), /*#__PURE__*/React.createElement("nav", {
    className: "header__nav js-header__nav",
    id: "header-nav",
    role: "navigation",
    "aria-label": "Main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "header__nav-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "header__label sr-only"
  }, accessibilityName), /*#__PURE__*/React.createElement("ul", {
    className: "header__list"
  }, menuItems && menuItems.length && menuItems.map((item, index) => /*#__PURE__*/React.createElement("li", {
    className: "header__item",
    key: index
  }, /*#__PURE__*/React.createElement("a", {
    href: item.href,
    className: "header__link",
    onClick: handleHeaderChange
  }, item.name)))))))));
}

const ElementHelper = {
  getFirstImageUrl: (content, pos, width, height) => {
    if (typeof content !== undefined && content[pos].content.gallery.length && typeof content[pos].content.gallery[0].publicUrl === 'string') {
      let imageCollection = [];

      for (var image of content[pos].content.gallery) {
        let imageUrl = image.publicUrl;
        let search = process.env.REACT_APP_API_BASE_URL;
        let replace = process.env.REACT_APP_API_BASE_URL + 'resize/image/';
        imageCollection.push(imageUrl.replace(search, replace) + '/' + width + '/' + height);
      }

      return imageCollection[0];
    }
  },
  getImages: (content, pos, width, height) => {
    if (typeof content !== undefined && content[pos].content.gallery.length && typeof content[pos].content.gallery[0].publicUrl === 'string') {
      let imageCollection = [];

      for (var image of content[pos].content.gallery) {
        if (image.publicUrl) {
          let imageUrl = image.publicUrl;
          let search = process.env.REACT_APP_API_BASE_URL;
          let replace = process.env.REACT_APP_API_BASE_URL + 'resize/image/';
          imageCollection.push(imageUrl.replace(search, replace) + '/' + width + '/' + height);
        }
      }

      return imageCollection.map((image, index) => /*#__PURE__*/React.createElement("img", {
        src: image,
        alt: "",
        key: index
      }));
    }
  }
};

function Hero(props) {
  const [content, setContent] = useState([]);
  const colPos = props.colPos ? props.colPos : null;
  if (!colPos) console.log('Error: ColPos not defined!');
  const contents = props.contents ? props.contents[colPos] : null;
  const sectionClass = props.sectionClass ? props.sectionClass : null;
  const sectionId = props.sectionId ? props.sectionId : null;
  useEffect(() => {
    setContent(contents);
  }, [contents]);
  return content && content.length ? /*#__PURE__*/React.createElement("section", {
    className: 'hero padding-y-xxl ' + sectionClass,
    id: sectionId,
    style: {
      backgroundImage: "linear-gradient(45deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0) 40%), url('" + ElementHelper.getFirstImageUrl(content, 0, 1280, 800) + "')"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container max-width-100% min-height-50vh flex flex-wrap items-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-component margin-bottom-sm width-50% margin-left-xl"
  }, /*#__PURE__*/React.createElement(Element, {
    data: content[0],
    type: "header",
    customTag: "h1",
    customId: "hero",
    customClass: "heroc"
  }), /*#__PURE__*/React.createElement(Element, {
    data: content[0],
    type: "subheader",
    wrap: "strong"
  }), /*#__PURE__*/React.createElement(Element, {
    data: content[0],
    type: "bodytext"
  })))) : null;
}

function FooterMain(props) {
  const [content, setContent] = useState([]);
  const Logo = props.logo;
  const Link = props.link;
  const colPos = props.colPos ? props.colPos : null;
  if (!colPos) console.log('Error: ColPos not defined!');
  const contents = props.contents ? props.contents[colPos] : null;
  const sectionClass = props.sectionClass ? props.sectionClass : null;
  useEffect(() => {
    setContent(contents);
  }, [contents]);
  return content && content.length ? /*#__PURE__*/React.createElement("footer", {
    className: 'main-footer padding-y-lg ' + sectionClass
  }, /*#__PURE__*/React.createElement("div", {
    className: "container max-width-adaptive-lg"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid gap-lg"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-12 col-6@sm"
  }, content.map((item, index) => /*#__PURE__*/React.createElement("div", {
    key: index
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-component"
  }, /*#__PURE__*/React.createElement(Element, {
    data: item,
    type: "header",
    customTag: "h4"
  }), /*#__PURE__*/React.createElement(Element, {
    data: item,
    type: "subheader",
    customTag: "p"
  }), /*#__PURE__*/React.createElement(Element, {
    data: item,
    type: "bodytext"
  }), /*#__PURE__*/React.createElement(Element, {
    data: item,
    type: "upload",
    width: "200",
    customClass: "col-12"
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "col-12 col-6@sm display@sm"
  }, /*#__PURE__*/React.createElement(Logo, null))), /*#__PURE__*/React.createElement("div", {
    className: "border-top padding-top-xs margin-top-lg flex justify-end"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-sm"
  }, /*#__PURE__*/React.createElement(Link, {
    to: "/privacy",
    className: "color-contrast-high margin-left-xs"
  }, "Datenschutz"), /*#__PURE__*/React.createElement(Link, {
    to: "/imprint",
    className: "color-contrast-high margin-left-xs"
  }, "Impressum"))))) : null;
}

export { Accordion, Element, FooterMain, Header, Hero };
//# sourceMappingURL=index.modern.js.map
