function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var parse = _interopDefault(require('html-react-parser'));
var Moment = _interopDefault(require('moment'));
require('moment/locale/de');
var axios = _interopDefault(require('axios'));

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
    if (typeof data.content.header !== undefined && data.content.header && type === 'header') return /*#__PURE__*/React__default.createElement(CustomTag, {
      className: customClass,
      id: customId
    }, /*#__PURE__*/React__default.createElement("span", null, parse(data.content.header)));
    if (data.content.shortcut && data.content.shortcut[0].content.header && type === 'header') return /*#__PURE__*/React__default.createElement(CustomTag, {
      className: customClass,
      id: customId
    }, /*#__PURE__*/React__default.createElement("span", null, parse(data.content.shortcut[0].content.header)));
    return null;
  };

  var parseSubHeader = function parseSubHeader() {
    if (typeof data.content.subheader !== undefined && data.content.subheader && type === 'subheader') return /*#__PURE__*/React__default.createElement(CustomTag, {
      className: customClass,
      id: customId
    }, /*#__PURE__*/React__default.createElement("span", null, parse(data.content.subheader)));
    if (data.content.shortcut && data.content.shortcut[0].content.subheader && type === 'subheader') return /*#__PURE__*/React__default.createElement(CustomTag, {
      className: customClass,
      id: customId
    }, /*#__PURE__*/React__default.createElement("span", null, parse(data.content.shortcut[0].content.subheader)));
    return null;
  };

  var parseDate = function parseDate() {
    if (typeof data.content.date !== undefined && data.content.date && type === 'date') return /*#__PURE__*/React__default.createElement(CustomTag, {
      className: customClass,
      id: customId
    }, /*#__PURE__*/React__default.createElement("span", null, Moment.unix(data.content.date).format('DD. MMMM YYYY')));
    if (data.content.shortcut && data.content.shortcut[0].content.date && type === 'date') return /*#__PURE__*/React__default.createElement(CustomTag, {
      className: customClass,
      id: customId
    }, /*#__PURE__*/React__default.createElement("span", null, parse(data.content.shortcut[0].content.date)));
    return null;
  };

  var parseBodytext = function parseBodytext() {
    if (typeof data.content.bodytext === 'string' && type === 'bodytext') return /*#__PURE__*/React__default.createElement(CustomTag, null, parse(data.content.bodytext));

    if (typeof data.content.bodytext === 'object' && type === 'bodytext') {
      return /*#__PURE__*/React__default.createElement(React__default.Fragment, null);
    }

    if (data.content.shortcut && typeof data.content.shortcut[0].content.bodytext === 'string' && type === 'bodytext') return /*#__PURE__*/React__default.createElement(CustomTag, null, parse(data.content.shortcut[0].content.bodytext));
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
        return /*#__PURE__*/React__default.createElement("img", {
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
        dataCells.push( /*#__PURE__*/React__default.createElement("td", {
          key: cellKey,
          className: "table__cell",
          role: "cell"
        }, /*#__PURE__*/React__default.createElement("span", {
          className: "table__label",
          "aria-hidden": "true"
        }, cellKey), cell));
      });
      dataRows.push( /*#__PURE__*/React__default.createElement("tr", {
        key: rowKey,
        className: "table__row"
      }, dataCells));
    });
    return /*#__PURE__*/React__default.createElement("table", {
      className: "table table--expanded@xs position-relative z-index-1 width-100% js-table"
    }, /*#__PURE__*/React__default.createElement("tbody", {
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

      return /*#__PURE__*/React__default.createElement("div", {
        className: "grid gap-sm",
        id: customId
      }, mediaCollection.map(function (media, index) {
        return /*#__PURE__*/React__default.createElement("div", {
          className: 'thumbnail ' + customClass,
          key: index
        }, /*#__PURE__*/React__default.createElement("a", {
          href: media.publicUrl,
          className: "text-decoration-none color-contrast-medium",
          alt: media.description,
          target: "blank"
        }, /*#__PURE__*/React__default.createElement("div", {
          className: "grid gap-sm margin-bottom-sm"
        }, /*#__PURE__*/React__default.createElement("div", {
          className: "col-3 col-4@md"
        }, /*#__PURE__*/React__default.createElement("img", {
          src: media.url,
          alt: media.description,
          key: index
        })), /*#__PURE__*/React__default.createElement("div", {
          className: "col-12 col-8@md text-component"
        }, media.filename && /*#__PURE__*/React__default.createElement("div", {
          className: "filename_url"
        }, media.filename), media.title && /*#__PURE__*/React__default.createElement("div", {
          className: "filename_title text-sm margin-top-sm"
        }, media.title), media.description && /*#__PURE__*/React__default.createElement("div", {
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

  var _useState = React.useState(-1),
      accordionActive = _useState[0],
      setAccordionState = _useState[1];

  var handleAccordionClick = function handleAccordionClick(i) {
    if (accordionActive === i) {
      setAccordionState(-1);
    } else {
      setAccordionState(i);
    }
  };

  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement("section", {
    className: 'accordion_section ' + sectionClass,
    id: sectionId
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "container max-width-adaptive-lg"
  }, /*#__PURE__*/React__default.createElement("ul", {
    className: "accordion js-accordion",
    "data-animation": "on",
    "data-multi-items": "on"
  }, contents && contents.length && contents.map(function (item, index) {
    return /*#__PURE__*/React__default.createElement("li", {
      className: "accordion__item  js-accordion__item " + (accordionActive === index ? 'accordion__item--is-open' : ''),
      onClick: function onClick() {
        return handleAccordionClick(index);
      },
      key: index
    }, /*#__PURE__*/React__default.createElement("button", {
      className: "reset accordion__header padding-y-sm padding-x-md js-tab-focus",
      type: "button"
    }, /*#__PURE__*/React__default.createElement(Element, {
      data: item,
      type: "header",
      customClass: "text-md"
    }), /*#__PURE__*/React__default.createElement("svg", {
      className: "icon accordion__icon-arrow no-js:is-hidden",
      viewBox: "0 0 16 16",
      "aria-hidden": "true"
    }, /*#__PURE__*/React__default.createElement("g", {
      className: "icon__group",
      fill: "none",
      stroke: "currentColor",
      strokeLinecap: "square",
      strokeMiterlimit: "10"
    }, /*#__PURE__*/React__default.createElement("path", {
      d: "M2 2l12 12"
    }), /*#__PURE__*/React__default.createElement("path", {
      d: "M14 2L2 14"
    })))), /*#__PURE__*/React__default.createElement("div", {
      className: "accordion__panel js-accordion__panel"
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "text-component padding-top-xxxs padding-x-md padding-bottom-md"
    }, /*#__PURE__*/React__default.createElement(Element, {
      data: item,
      type: "bodytext"
    }))));
  })))));
}

var ElementHelper = {
  getFirstImageUrl: function getFirstImageUrl(content, pos, width, height) {
    if (typeof content !== undefined && content[pos].content.gallery.length && typeof content[pos].content.gallery[0].publicUrl === 'string') {
      var imageCollection = [];

      for (var _iterator = _createForOfIteratorHelperLoose(content[pos].content.gallery), _step; !(_step = _iterator()).done;) {
        var image = _step.value;
        var imageUrl = image.publicUrl;
        var search = process.env.REACT_APP_API_BASE_URL;
        var replace = process.env.REACT_APP_API_BASE_URL + 'resize/image/';
        imageCollection.push(imageUrl.replace(search, replace) + '/' + width + '/' + height);
      }

      return imageCollection[0];
    }
  },
  getImages: function getImages(content, pos, width, height) {
    if (typeof content !== undefined && content[pos].content.gallery.length && typeof content[pos].content.gallery[0].publicUrl === 'string') {
      var imageCollection = [];

      for (var _iterator2 = _createForOfIteratorHelperLoose(content[pos].content.gallery), _step2; !(_step2 = _iterator2()).done;) {
        var image = _step2.value;

        if (image.publicUrl) {
          var imageUrl = image.publicUrl;
          var search = process.env.REACT_APP_API_BASE_URL;
          var replace = process.env.REACT_APP_API_BASE_URL + 'resize/image/';
          imageCollection.push(imageUrl.replace(search, replace) + '/' + width + '/' + height);
        }
      }

      return imageCollection.map(function (image, index) {
        return /*#__PURE__*/React__default.createElement("img", {
          src: image,
          alt: "",
          key: index
        });
      });
    }
  }
};

function CardV9(props) {
  var colPos = props.colPos ? props.colPos : null;
  if (!colPos) console.log('Error: ColPos not defined!');
  var contents = props.contents ? props.contents[colPos] : null;
  var sectionClass = props.sectionClass ? props.sectionClass : null;
  var sectionId = props.sectionId ? props.sectionId : null;
  var moreButton = props.moreButton ? props.moreButton : 'More';
  var colWidth = props.colWidth ? props.colWidth : 'col-12';
  return /*#__PURE__*/React__default.createElement("section", {
    className: 'padding-y-xl bg-contrast-lower ' + sectionClass,
    id: sectionId
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "container max-width-adaptive-lg"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "grid gap-xs justify-center"
  }, contents && contents.length && contents.map(function (item, index) {
    return /*#__PURE__*/React__default.createElement("div", {
      className: colWidth,
      key: index
    }, /*#__PURE__*/React__default.createElement("a", {
      href: item.content.headerLink && item.content.headerLink.url,
      target: "_blank",
      rel: "noopener noreferrer",
      className: "card-v9 card-v9--overlay-bg radius-md",
      "aria-labelledby": "card-title-2",
      style: {
        backgroundImage: "url('" + ElementHelper.getFirstImageUrl(contents, index, 600, 400) + "')"
      }
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "card-v9__content padding-md"
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "padding-bottom-xxxl max-width-xs"
    }, /*#__PURE__*/React__default.createElement(Element, {
      data: item,
      type: "header",
      customTag: "h2",
      customId: 'card-title-' + index,
      customClass: "text-xl margin-bottom-xs"
    }), /*#__PURE__*/React__default.createElement(Element, {
      data: item,
      type: "subheader",
      customTag: "h3"
    }), /*#__PURE__*/React__default.createElement(Element, {
      data: item,
      type: "bodytext"
    })), /*#__PURE__*/React__default.createElement("div", {
      className: "margin-top-auto"
    }, /*#__PURE__*/React__default.createElement("span", {
      className: "card-v9__btn"
    }, /*#__PURE__*/React__default.createElement("i", null, moreButton))))));
  }))));
}

function ContactV3(props) {
  var colPos = props.colPos ? props.colPos : null;
  if (!colPos) console.log('Error: ColPos not defined!');
  var reactAppContact = {
    url: props.reactAppContactUrl,
    token: props.reactAppApiContactToken
  };
  var contents = props.contents ? props.contents[colPos] : null;
  var sectionClass = props.sectionClass ? props.sectionClass : null;
  var sectionId = props.sectionId ? props.sectionId : null;
  var submitButton = props.submitButton ? props.submitButton : 'Submit';

  var _useState = React.useState(''),
      contactName = _useState[0],
      setContactName = _useState[1];

  var _useState2 = React.useState(''),
      contactEmail = _useState2[0],
      setContactEmail = _useState2[1];

  var _useState3 = React.useState(''),
      contactMessage = _useState3[0],
      setContactMessage = _useState3[1];

  var _useState4 = React.useState(false),
      formState = _useState4[0],
      setFormState = _useState4[1];

  var _useState5 = React.useState(''),
      resultMessage = _useState5[0],
      setResultMessage = _useState5[1];

  var handleSubmit = function handleSubmit(e) {
    e.preventDefault();
    axios({
      method: 'post',
      url: reactAppContact.url,
      headers: {
        'content-type': 'application/json'
      },
      data: {
        token: reactAppContact.token,
        name: contactName,
        email: contactEmail,
        message: contactMessage
      }
    }).then(function (result) {
      setContactName('');
      setContactEmail('');
      setContactMessage('');
      setResultMessage(result.data.message);
      setFormState(true);
    })["catch"](function (error) {
      console.log('Error message:');
      console.log(error.message);
    });
  };

  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement("section", {
    className: 'contact-v3 bg-contrast-lower padding-y-xl ' + sectionClass,
    id: sectionId
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "container max-width-adaptive-lg"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "grid gap-sm"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "col-6@sm col-12"
  }, contents && contents.length && contents.map(function (item, index) {
    return /*#__PURE__*/React__default.createElement("div", {
      className: "text-component",
      key: index
    }, /*#__PURE__*/React__default.createElement(Element, {
      data: item,
      type: "header",
      customTag: "h4"
    }), /*#__PURE__*/React__default.createElement(Element, {
      data: item,
      type: "bodytext"
    }), /*#__PURE__*/React__default.createElement(Element, {
      data: item,
      type: "image",
      width: "1280",
      height: "500",
      imageClass: "block width-100% height-100% object-cover"
    }));
  })), /*#__PURE__*/React__default.createElement("div", {
    className: "col-6@sm col-12"
  }, formState ? /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement("p", null, resultMessage)) : /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement("form", {
    onSubmit: handleSubmit
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "margin-bottom-sm"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "margin-bottom-sm"
  }, /*#__PURE__*/React__default.createElement("label", {
    className: "form-label margin-bottom-xxs",
    htmlFor: "contactName"
  }, "Name"), /*#__PURE__*/React__default.createElement("input", {
    className: "form-control width-100%",
    type: "text",
    name: "contactName",
    id: "contactName",
    value: contactName,
    onChange: function onChange(e) {
      return setContactName(e.target.value);
    },
    required: true
  })), /*#__PURE__*/React__default.createElement("div", {
    className: "margin-bottom-sm"
  }, /*#__PURE__*/React__default.createElement("label", {
    className: "form-label margin-bottom-xxs",
    htmlFor: "contactEmail"
  }, "Email"), /*#__PURE__*/React__default.createElement("input", {
    className: "form-control width-100%",
    type: "email",
    name: "contactEmail",
    id: "contactEmail",
    value: contactEmail,
    onChange: function onChange(e) {
      return setContactEmail(e.target.value);
    },
    required: true
  })), /*#__PURE__*/React__default.createElement("div", {
    className: "margin-bottom-sm"
  }, /*#__PURE__*/React__default.createElement("label", {
    className: "form-label margin-bottom-xxs",
    htmlFor: "contactMessage"
  }, "Nachricht"), /*#__PURE__*/React__default.createElement("textarea", {
    className: "form-control width-100%",
    rows: "9",
    name: "contactMessage",
    id: "contactMessage",
    value: contactMessage,
    onChange: function onChange(e) {
      return setContactMessage(e.target.value);
    }
  })), /*#__PURE__*/React__default.createElement("div", {
    className: "text-right"
  }, /*#__PURE__*/React__default.createElement("button", {
    className: "btn btn--primary"
  }, submitButton))))))))));
}

function FeatureV2(props) {
  var colPos = props.colPos ? props.colPos : null;
  if (!colPos) console.log('Error: ColPos not defined!');
  var contents = props.contents ? props.contents[colPos] : null;
  var sectionClass = props.sectionClass ? props.sectionClass : null;
  var sectionId = props.sectionId ? props.sectionId : null;
  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, contents && contents.length && contents.map(function (item, index) {
    return /*#__PURE__*/React__default.createElement("section", {
      key: index,
      className: 'feature-v2 padding-y-xl ' + sectionClass,
      id: sectionId
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "container max-width-adaptive-lg"
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "grid gap-md"
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "col-4@md"
    }, /*#__PURE__*/React__default.createElement(Element, {
      data: item,
      type: "subheader",
      customTag: "h4"
    })), /*#__PURE__*/React__default.createElement("div", {
      className: "col-8@md"
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "text-component padding-left-md@md"
    }, /*#__PURE__*/React__default.createElement(Element, {
      data: item,
      type: "header",
      customTag: "h2"
    }), /*#__PURE__*/React__default.createElement(Element, {
      data: item,
      type: "bodytext"
    }), /*#__PURE__*/React__default.createElement(Element, {
      data: item,
      type: "image",
      width: "800",
      height: "800"
    }), /*#__PURE__*/React__default.createElement(Element, {
      data: item,
      type: "upload",
      width: "400",
      customClass: "col-12 col-6@md"
    }))))));
  }));
}

function FeatureV11(props) {
  var colPos = props.colPos ? props.colPos : null;
  if (!colPos) console.log('Error: ColPos not defined!');
  var contents = props.contents ? props.contents[colPos] : null;
  var sectionClass = props.sectionClass ? props.sectionClass : null;
  var sectionId = props.sectionId ? props.sectionId : null;
  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, contents && contents.length && contents.map(function (item, index) {
    return /*#__PURE__*/React__default.createElement("section", {
      key: index,
      className: 'feature-v11 position-relative z-index-1 bg-contrast-lower ' + sectionClass,
      id: sectionId
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "container max-width-adaptive-lg position-relative"
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "grid padding-x-md padding-x-0@md"
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "position-relative z-index-2 col-6@md col-5@lg"
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "text-component bg padding-md padding-lg@md shadow-sm line-height-md margin-y-xxl"
    }, /*#__PURE__*/React__default.createElement(Element, {
      data: item,
      type: "header",
      customTag: "h1"
    }), /*#__PURE__*/React__default.createElement(Element, {
      data: item,
      type: "bodytext"
    }))), /*#__PURE__*/React__default.createElement("figure", {
      className: "position-absolute z-index-1 top-0 right-0 height-100% col-10@md overflow-hidden"
    }, /*#__PURE__*/React__default.createElement(Element, {
      data: item,
      type: "image",
      width: "800",
      height: "525"
    })))));
  }));
}

function FeatureV11BottomCenter(props) {
  var colPos = props.colPos ? props.colPos : null;
  if (!colPos) console.log('Error: ColPos not defined!');
  var contents = props.contents ? props.contents[colPos] : null;
  var sectionClass = props.sectionClass ? props.sectionClass : null;
  var sectionId = props.sectionId ? props.sectionId : null;
  var moreButton = props.moreButton ? props.moreButton : 'More';
  var colWidth = props.colWidth ? props.colWidth : 'col-12';
  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement("section", {
    className: 'feature-v11-bottom-center padding-y-xl position-relative z-index-1 ' + sectionClass,
    id: sectionId
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "container max-width-adaptive-lg position-relative"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "grid gap-sm"
  }, contents && contents.length && contents.map(function (item, index) {
    return /*#__PURE__*/React__default.createElement("div", {
      className: colWidth,
      key: index
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "grid position-relative justify-center padding-x-md padding-x-0@md height-100%"
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "z-index-2 col-8@md"
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "text-component bg padding-md padding-lg@md shadow-sm line-height-md margin-top-xxxl"
    }, /*#__PURE__*/React__default.createElement(Element, {
      data: item,
      type: "header",
      customTag: "h4"
    }), /*#__PURE__*/React__default.createElement(Element, {
      data: item,
      type: "bodytext"
    }), /*#__PURE__*/React__default.createElement("a", {
      href: item.content.headerLink && item.content.headerLink.url,
      className: "btn btn--primary margin-top-xs",
      target: "_blank",
      rel: "noopener noreferrer"
    }, moreButton))), /*#__PURE__*/React__default.createElement("figure", {
      className: "position-absolute z-index-1 left-0 top-0 right-0 height-90%"
    }, /*#__PURE__*/React__default.createElement(Element, {
      data: item,
      type: "image",
      width: "1280",
      height: "500",
      imageClass: "block width-100% height-100% object-cover"
    }))));
  })))));
}

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
  var Link = props.link;
  var showNavigation = props.showNavigation ? props.showNavigation : null;
  var menuItems = props.menuItems ? props.menuItems : null;
  var accessibilityName = props.accessibilityName ? props.accessibilityName : 'Menu';
  React.useEffect(function () {
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

  return /*#__PURE__*/React__default.createElement("header", {
    className: "header position-fixed opacity-90% js-header "
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "header__container container max-width-lg"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "header__logo"
  }, /*#__PURE__*/React__default.createElement(Link, {
    to: "/"
  }, /*#__PURE__*/React__default.createElement(Logo, null))), showNavigation && /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement("button", {
    className: "btn btn--subtle header__trigger js-header__trigger padding-bottom-sm padding-top-sm padding-right-xxs padding-left-sm shadow-none",
    "aria-label": "Toggle menu",
    "aria-expanded": "false",
    "aria-controls": "header-nav"
  }, /*#__PURE__*/React__default.createElement("i", {
    className: "header__trigger-icon",
    "aria-hidden": "true"
  }), /*#__PURE__*/React__default.createElement("span", {
    className: "sr-only"
  }, accessibilityName)), /*#__PURE__*/React__default.createElement("nav", {
    className: "header__nav js-header__nav",
    id: "header-nav",
    role: "navigation",
    "aria-label": "Main"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "header__nav-inner"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "header__label sr-only"
  }, accessibilityName), /*#__PURE__*/React__default.createElement("ul", {
    className: "header__list"
  }, menuItems && menuItems.length && menuItems.map(function (item, index) {
    return /*#__PURE__*/React__default.createElement("li", {
      className: "header__item",
      key: index
    }, /*#__PURE__*/React__default.createElement("a", {
      href: item.href,
      className: "header__link",
      onClick: handleHeaderChange
    }, item.name));
  })))))));
}

function Hero(props) {
  var _useState = React.useState([]),
      content = _useState[0],
      setContent = _useState[1];

  var colPos = props.colPos ? props.colPos : null;
  if (!colPos) console.log('Error: ColPos not defined!');
  var contents = props.contents ? props.contents[colPos] : null;
  var sectionClass = props.sectionClass ? props.sectionClass : null;
  var sectionId = props.sectionId ? props.sectionId : null;
  React.useEffect(function () {
    setContent(contents);
  }, [contents]);
  return content && content.length ? /*#__PURE__*/React__default.createElement("section", {
    className: 'hero padding-y-xxl ' + sectionClass,
    id: sectionId,
    style: {
      backgroundImage: "linear-gradient(45deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0) 40%), url('" + ElementHelper.getFirstImageUrl(content, 0, 1280, 800) + "')"
    }
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "container max-width-100% min-height-50vh flex flex-wrap items-center"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "text-component margin-bottom-sm width-50% margin-left-xl"
  }, /*#__PURE__*/React__default.createElement(Element, {
    data: content[0],
    type: "header",
    customTag: "h1",
    customId: "hero",
    customClass: "heroc"
  }), /*#__PURE__*/React__default.createElement(Element, {
    data: content[0],
    type: "subheader",
    wrap: "strong"
  }), /*#__PURE__*/React__default.createElement(Element, {
    data: content[0],
    type: "bodytext"
  })))) : null;
}

function FooterMain(props) {
  var _useState = React.useState([]),
      content = _useState[0],
      setContent = _useState[1];

  var Logo = props.logo;
  var Link = props.link;
  var colPos = props.colPos ? props.colPos : null;
  if (!colPos) console.log('Error: ColPos not defined!');
  var contents = props.contents ? props.contents[colPos] : null;
  var sectionClass = props.sectionClass ? props.sectionClass : null;
  var sectionId = props.sectionId ? props.sectionId : null;
  React.useEffect(function () {
    setContent(contents);
  }, [contents]);
  return content && content.length ? /*#__PURE__*/React__default.createElement("footer", {
    className: 'main-footer padding-y-lg ' + sectionClass,
    id: sectionId
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "container max-width-adaptive-lg"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "grid gap-lg"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "col-12 col-6@sm"
  }, content.map(function (item, index) {
    return /*#__PURE__*/React__default.createElement("div", {
      key: index
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "text-component"
    }, /*#__PURE__*/React__default.createElement(Element, {
      data: item,
      type: "header",
      customTag: "h4"
    }), /*#__PURE__*/React__default.createElement(Element, {
      data: item,
      type: "subheader",
      customTag: "p"
    }), /*#__PURE__*/React__default.createElement(Element, {
      data: item,
      type: "bodytext"
    }), /*#__PURE__*/React__default.createElement(Element, {
      data: item,
      type: "upload",
      width: "200",
      customClass: "col-12"
    })));
  })), /*#__PURE__*/React__default.createElement("div", {
    className: "col-12 col-6@sm display@sm"
  }, /*#__PURE__*/React__default.createElement(Link, {
    to: "/"
  }, /*#__PURE__*/React__default.createElement(Logo, null)))), /*#__PURE__*/React__default.createElement("div", {
    className: "border-top padding-top-xs margin-top-lg flex justify-end"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "text-sm"
  }, /*#__PURE__*/React__default.createElement(Link, {
    to: "/privacy",
    className: "color-contrast-high margin-left-xs"
  }, "Datenschutz"), /*#__PURE__*/React__default.createElement(Link, {
    to: "/imprint",
    className: "color-contrast-high margin-left-xs"
  }, "Impressum"))))) : null;
}

exports.Accordion = Accordion;
exports.CardV9 = CardV9;
exports.ContactV3 = ContactV3;
exports.Element = Element;
exports.ElementHelper = ElementHelper;
exports.FeatureV11 = FeatureV11;
exports.FeatureV11BottomCenter = FeatureV11BottomCenter;
exports.FeatureV2 = FeatureV2;
exports.FooterMain = FooterMain;
exports.Header = Header;
exports.Hero = Hero;
exports.ImportScript = ImportScript;
//# sourceMappingURL=index.js.map
