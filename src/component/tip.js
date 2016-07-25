import React from 'react';
import ReactDOM from 'react-dom';


var tipContainerId = '_gm_tips_container' + (Math.random() + '').slice(2);
var tipsContainer = document.getElementById(tipContainerId);
if (!tipsContainer) {
    tipsContainer = document.createElement('div');
    tipsContainer.className = 'gm-tips';
    tipsContainer.id = tipContainerId;
    document.body.appendChild(tipsContainer);
}

var TipStatics = {
    tip: function (options) {
        var _b_onClose = options.onClose;
        var div = document.createElement('div');
        div.className = 'gm-tips-cell';
        tipsContainer.appendChild(div);

        options.onClose = function () {
            tipsContainer.removeChild(div);
            if (_b_onClose) {
                _b_onClose();
            }
        };
        ReactDOM.render(<TipOverlay {...options} />, div);
    },
    success: function (options) {
        if (typeof options === 'string') {
            options = {
                children: options
            };
        }
        options.type = 'success';
        TipStatics.tip(options);
    },
    info: function (options) {
        if (typeof options === 'string') {
            options = {
                children: options
            };
        }
        options.type = 'info';
        TipStatics.tip(options);
    },
    warning: function (options) {
        if (typeof options === 'string') {
            options = {
                children: options
            };
        }
        options.type = 'warning';
        TipStatics.tip(options);
    },
    danger: function (options) {
        if (typeof options === 'string') {
            options = {
                children: options
            };
        }
        options.type = 'danger';
        TipStatics.tip(options);
    }
};

var TipOverlay = React.createClass({
    getDefaultProps: function () {
        return {
            time: 3000
        };
    },
    render: function () {
        return (
            <div ref="tipOverlay" className="animated fadeInRight">
                <Tip key="tip" title={this.props.title} type={this.props.type}
                     onClose={this.handleClose}>{this.props.children}</Tip>
            </div>
        );
    },
    componentDidMount: function () {
        var t = this;
        if (t.props.time) {
            t.timer = setTimeout(function () {
                t.fadeOut();
            }, t.props.time);
        }
    },
    componentWillUnmount: function () {
        clearTimeout(this.timer);
    },
    handleClose: function () {
        this.fadeOut();
    },
    fadeOut: function () {
        var t = this;
        if (!t.hasClosed) {
            t.hasClosed = true;
            t.props.onClose();
        }
    }
});

var Tip = React.createClass({
    statics: TipStatics,
    getDefaultProps: function () {
        return {
            title: '',
            type: 'info',
            onClose: function () {
            }
        };
    },
    render: function () {
        var iconClassName = {
            success: 'glyphicon glyphicon-ok-sign',
            info: 'glyphicon glyphicon-info-sign',
            warning: 'glyphicon glyphicon-exclamation-sign',
            danger: 'glyphicon glyphicon-remove-sign'
        };

        return (
            <div className="gm-tip panel panel-default">
                <button type="button" className="close" onClick={this.handleClose}><span>&times;</span></button>
                <i className={"text-" + this.props.type + ' ' + iconClassName[this.props.type]}></i>
                <div className="panel-body">
                    {this.props.title ? <div><strong>{this.props.title}</strong></div> : undefined}
                    {this.props.children}
                </div>
            </div>
        );
    },
    handleClose: function () {
        this.props.onClose();
    }
});

export default Tip;