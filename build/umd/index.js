(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react')) :
    typeof define === 'function' && define.amd ? define(['react'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.ReactTagInput = factory(global.React));
})(this, (function (React) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

    var classSelectors = {
        wrapper: "react-tag-input",
        input: "react-tag-input__input",
        tag: "react-tag-input__tag",
        tagContent: "react-tag-input__tag__content",
        tagRemove: "react-tag-input__tag__remove",
        tagRemoveReadOnly: "react-tag-input__tag__remove-readonly",
    };

    function removeLineBreaks(value) {
        return value.replace(/(\r\n|\n|\r)/gm, "");
    }
    var htmlEntityMap = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
        "/": "&#x2F;",
        "`": "&#x60;",
        "=": "&#x3D;",
    };
    function escapeHtml(value) {
        return String(value).replace(/[&<>"'`=\/]/g, function (s) {
            return htmlEntityMap[s];
        });
    }
    function safeHtmlString(value) {
        return escapeHtml(removeLineBreaks(value));
    }

    var __extends$2 = (undefined && undefined.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            if (typeof b !== "function" && b !== null)
                throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var ContentEditable = (function (_super) {
        __extends$2(ContentEditable, _super);
        function ContentEditable() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.focused = false;
            _this.removed = false;
            _this.preFocusedValue = "";
            _this.onPaste = function (e) {
                e.preventDefault();
                var text = e.clipboardData.getData("text/plain");
                document.execCommand("insertHTML", false, safeHtmlString(text));
            };
            _this.onFocus = function () {
                _this.preFocusedValue = _this.getValue();
                _this.focused = true;
            };
            _this.onBlur = function () {
                _this.focused = false;
                var ref = _this.props.innerEditableRef.current;
                var _a = _this.props, validator = _a.validator, change = _a.change;
                if (!_this.removed && ref) {
                    if (ref.innerText === "") {
                        _this.props.remove();
                        return;
                    }
                    if (validator) {
                        var valid = validator(_this.getValue());
                        if (!valid) {
                            ref.innerText = _this.preFocusedValue;
                            return;
                        }
                    }
                    change(ref.innerText);
                }
            };
            _this.onKeyDown = function (e) {
                if (e.keyCode === 13 || e.keyCode === 188) {
                    e.preventDefault();
                    _this.focusInputRef();
                    return;
                }
                var removeOnBackspace = _this.props.removeOnBackspace;
                var value = _this.getValue();
                if (removeOnBackspace && e.keyCode === 8 && value === "") {
                    _this.removed = true;
                    _this.props.remove();
                    _this.focusInputRef();
                    return;
                }
            };
            _this.getValue = function () {
                var ref = _this.getRef();
                return ref ? ref.innerText : "";
            };
            _this.getRef = function () {
                return _this.props.innerEditableRef.current;
            };
            _this.focusInputRef = function () {
                var inputRef = _this.props.inputRef;
                if (inputRef && inputRef.current) {
                    inputRef.current.focus();
                }
            };
            return _this;
        }
        ContentEditable.prototype.componentDidMount = function () {
            this.preFocusedValue = this.getValue();
        };
        ContentEditable.prototype.render = function () {
            var _a = this.props, value = _a.value, className = _a.className, innerEditableRef = _a.innerEditableRef;
            return (React__default["default"].createElement("div", { ref: innerEditableRef, className: className, contentEditable: true, onPaste: this.onPaste, onFocus: this.onFocus, onBlur: this.onBlur, onKeyDown: this.onKeyDown, dangerouslySetInnerHTML: { __html: safeHtmlString(value) } }));
        };
        return ContentEditable;
    }(React__default["default"].Component));

    var __extends$1 = (undefined && undefined.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            if (typeof b !== "function" && b !== null)
                throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var Tag = (function (_super) {
        __extends$1(Tag, _super);
        function Tag() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.innerEditableRef = React__default["default"].createRef();
            _this.remove = function () { return _this.props.remove(_this.props.index); };
            return _this;
        }
        Tag.prototype.render = function () {
            var _a = this.props, value = _a.value, index = _a.index, editable = _a.editable, inputRef = _a.inputRef, validator = _a.validator, update = _a.update, readOnly = _a.readOnly, removeOnBackspace = _a.removeOnBackspace, tagStyle = _a.tagStyle;
            var tagRemoveClass = !readOnly ?
                classSelectors.tagRemove : classSelectors.tagRemove + " " + classSelectors.tagRemoveReadOnly;
            return (React__default["default"].createElement("div", { className: classSelectors.tag, style: tagStyle },
                !editable && React__default["default"].createElement("div", { className: classSelectors.tagContent }, value),
                editable && (React__default["default"].createElement(ContentEditable, { value: value, inputRef: inputRef, innerEditableRef: this.innerEditableRef, className: classSelectors.tagContent, change: function (newValue) { return update(index, newValue); }, remove: this.remove, validator: validator, removeOnBackspace: removeOnBackspace })),
                React__default["default"].createElement("div", { className: tagRemoveClass, onClick: this.remove })));
        };
        return Tag;
    }(React__default["default"].Component));

    var __extends = (undefined && undefined.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            if (typeof b !== "function" && b !== null)
                throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
        if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
                if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                ar[i] = from[i];
            }
        }
        return to.concat(ar || Array.prototype.slice.call(from));
    };
    var NextTagInput = (function (_super) {
        __extends(NextTagInput, _super);
        function NextTagInput() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.state = { input: "", suggestions: "" };
            _this.inputRef = React__default["default"].createRef();
            _this.onInputChange = function (e) {
                _this.setState({ input: e.target.value });
            };
            _this.onInputKeyDown = function (e) {
                var input = _this.state.input;
                var _a = _this.props, validator = _a.validator, removeOnBackspace = _a.removeOnBackspace, suggestions = _a.suggestions;
                var value = input.toLowerCase();
                value = value.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
                var queryRegExp = new RegExp('^' + value, 'i');
                var suggest = suggestions.filter(function (item) { return queryRegExp.test(item); });
                if (value.length > 0)
                    _this.setState({ suggestions: suggest.toString() });
                if (e.keyCode === 13 || e.keyCode === 188) {
                    e.preventDefault();
                    if (input === "") {
                        _this.setState({ suggestions: "" });
                        return;
                    }
                    var valid = validator !== undefined ? validator(input) : true;
                    if (!valid) {
                        return;
                    }
                    _this.addTag(input);
                }
                else if (removeOnBackspace && (e.keyCode === 8 || e.keyCode === 46)) {
                    if (input !== "") {
                        return;
                    }
                    _this.removeTag(_this.props.tags.length - 1);
                }
            };
            _this.addTag = function (value) {
                var tags = __spreadArray([], _this.props.tags, true);
                tags.push(value);
                _this.props.onChange(tags);
                _this.setState({ input: "", suggestions: "" });
            };
            _this.removeTag = function (i) {
                var tags = __spreadArray([], _this.props.tags, true);
                tags.splice(i, 1);
                _this.props.onChange(tags);
                _this.setState({ suggestions: "" });
            };
            _this.updateTag = function (i, value) {
                var tags = __spreadArray([], _this.props.tags, true);
                tags[i] = value;
                _this.props.onChange(tags);
            };
            return _this;
        }
        NextTagInput.prototype.render = function () {
            var _this = this;
            var input = this.state.input;
            var _a = this.props, tags = _a.tags, placeholder = _a.placeholder, maxTags = _a.maxTags, editable = _a.editable, readOnly = _a.readOnly, validator = _a.validator, removeOnBackspace = _a.removeOnBackspace, tagStyle = _a.tagStyle;
            var maxTagsReached = maxTags !== undefined ? tags.length >= maxTags : false;
            var isEditable = readOnly ? false : (editable || false);
            var showInput = !readOnly && !maxTagsReached;
            var TagStyle = tagStyle !== undefined ? tagStyle : {};
            return (React__default["default"].createElement("div", { className: classSelectors.wrapper },
                tags.map(function (tag, i) { return (React__default["default"].createElement(Tag, { key: i, value: tag, index: i, editable: isEditable, readOnly: readOnly || false, inputRef: _this.inputRef, update: _this.updateTag, remove: _this.removeTag, validator: validator, removeOnBackspace: removeOnBackspace, tagStyle: TagStyle })); }),
                showInput &&
                    React__default["default"].createElement("input", { ref: this.inputRef, value: input, className: classSelectors.input, placeholder: placeholder || "Type and press enter", onChange: this.onInputChange, onKeyDown: this.onInputKeyDown }),
                React__default["default"].createElement("div", { id: "complete" }, this.state.suggestions ? this.state.suggestions : '')));
        };
        return NextTagInput;
    }(React__default["default"].Component));

    return NextTagInput;

}));
//# sourceMappingURL=index.js.map
