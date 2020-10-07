import React, { useEffect, useState } from 'react';
import parse from 'html-react-parser';
import Moment from 'moment';
import 'moment/locale/de';

function ImportScript(url, id) {
  var existingScript = document.getElementById(id);

  if (existingScript) {
    existingScript.remove();
  }

  var script = document.createElement('script');
  script.src = url;
  script.id = id;
  document.body.appendChild(script);
}

function Header(props) {
  var Logo = props.logo;
  var scriptFile = props.scriptFile;
  var scriptId = props.scriptId;
  var showNavigation = props.showNavigation ? props.showNavigation : null;
  var menuItems = props.menuItems ? props.menuItems : null;
  var accessibilityName = props.accessibilityName ? props.accessibilityName : 'Menu';
  useEffect(function () {
    if (showNavigation) {
      ImportScript(scriptFile, scriptId);
    }
  }, [showNavigation, scriptFile, scriptId]);

  var handleHeaderChange = function handleHeaderChange(evt) {
    evt.preventDefault();
    var elementId = evt.target.hash.replace('#', '');
    var scrollPoint = document.getElementById(elementId);
    var yOffset = -125;
    var y = scrollPoint.getBoundingClientRect().top + window.pageYOffset + yOffset;
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
  }, menuItems && menuItems.length && menuItems.map(function (item, index) {
    return /*#__PURE__*/React.createElement("li", {
      className: "header__item",
      key: index
    }, /*#__PURE__*/React.createElement("a", {
      href: item.href,
      className: "header__link",
      onClick: handleHeaderChange
    }, item.name));
  })))))));
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it;

  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;
      return function () {
        if (i >= o.length) return {
          done: true
        };
        return {
          done: false,
          value: o[i++]
        };
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  it = o[Symbol.iterator]();
  return it.next.bind(it);
}

function Element(props) {
  var type = props.type;
  var data = props.data;
  var CustomTag = props.customTag ? "" + props.customTag : "div";
  var customId = props.customId;
  var customClass = props.customClass;

  var parseHeader = function parseHeader() {
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

  var parseSubHeader = function parseSubHeader() {
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

  var parseDate = function parseDate() {
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

  var parseBodytext = function parseBodytext() {
    if (typeof data.content.bodytext === 'string' && type === 'bodytext') return /*#__PURE__*/React.createElement(CustomTag, null, parse(data.content.bodytext));

    if (typeof data.content.bodytext === 'object' && type === 'bodytext') {
      return /*#__PURE__*/React.createElement(React.Fragment, null);
    }

    if (data.content.shortcut && typeof data.content.shortcut[0].content.bodytext === 'string' && type === 'bodytext') return /*#__PURE__*/React.createElement(CustomTag, null, parse(data.content.shortcut[0].content.bodytext));
    return null;
  };

  var parseImage = function parseImage() {
    if (data.content.gallery.length > 0 && type === 'image') {
      var width = props.width;
      var height = props.height;
      var imageClass = props.imageClass;
      var imageCollection = [];

      for (var _iterator = _createForOfIteratorHelperLoose(data.content.gallery), _step; !(_step = _iterator()).done;) {
        var image = _step.value;
        var imageUrl = image.publicUrl;
        var search = process.env.REACT_APP_API_BASE_URL;
        var replace = process.env.REACT_APP_API_BASE_URL + 'resize/image/';
        imageCollection.push(imageUrl.replace(search, replace) + '/' + width + '/' + height);
      }

      return imageCollection.map(function (image, index) {
        return /*#__PURE__*/React.createElement("img", {
          src: image,
          alt: "",
          key: index,
          className: imageClass
        });
      });
    } else {
      return null;
    }
  };

  var parseTable = function parseTable() {
    var dataRows = [];
    data.content.bodytext.forEach(function (rows, rowKey) {
      var dataCells = [];
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

  var parseDownload = function parseDownload() {
    if (data.content.media.length > 0 && type === 'upload') {
      var width = props.width;
      var height = 0;
      var mediaCollection = [];

      for (var _iterator2 = _createForOfIteratorHelperLoose(data.content.media), _step2; !(_step2 = _iterator2()).done;) {
        var media = _step2.value;
        var mediaUrl = media.publicUrl;
        var search = process.env.REACT_APP_API_BASE_URL;
        var replace = process.env.REACT_APP_API_BASE_URL + 'resize/image/';
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
      }, mediaCollection.map(function (media, index) {
        return /*#__PURE__*/React.createElement("div", {
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
        }, media.description)))));
      }));
    } else {
      return null;
    }
  };

  var out = null;

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
      console.log("Sorry, No " + data.type + " for " + type + " type found for rendering.");
  }

  return out;
}

function Accordion(props) {
  var colPos = props.colPos ? props.colPos : null;
  if (!colPos) console.log('Error: ColPos not defined!');
  var contents = props.contents ? props.contents[colPos] : null;
  var sectionClass = props.sectionClass ? props.sectionClass : null;
  var sectionId = props.sectionId ? props.sectionId : null;

  var _useState = useState(-1),
      accordionActive = _useState[0],
      setAccordionState = _useState[1];

  var handleAccordionClick = function handleAccordionClick(i) {
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
  }, contents && contents.length && contents.map(function (item, index) {
    return /*#__PURE__*/React.createElement("li", {
      className: "accordion__item  js-accordion__item " + (accordionActive === index ? 'accordion__item--is-open' : ''),
      onClick: function onClick() {
        return handleAccordionClick(index);
      },
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
    }))));
  })))));
}

function FooterMain(props) {
  var _useState = useState([]),
      content = _useState[0],
      setContent = _useState[1];

  var Logo = props.logo;
  var Link = props.link;
  var colPos = props.colPos ? props.colPos : null;
  if (!colPos) console.log('Error: ColPos not defined!');
  var contents = props.contents ? props.contents[colPos] : null;
  var sectionClass = props.sectionClass ? props.sectionClass : null;
  useEffect(function () {
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
  }, content.map(function (item, index) {
    return /*#__PURE__*/React.createElement("div", {
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
    })));
  })), /*#__PURE__*/React.createElement("div", {
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

export { Accordion, FooterMain, Header };
//# sourceMappingURL=index.modern.js.map
