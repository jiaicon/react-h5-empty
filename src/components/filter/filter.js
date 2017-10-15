/* eslint  "jsx-a11y/no-static-element-interactions":"off", "react/no-array-index-key":"off" */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import classnames from 'classnames';
import './filter.css';

class Filter extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);

    this.filterConfig = {
      types: ['最新发布', '距离最近'],
      categories: window.serviceCategory || ['赛事服务', '应急救援', '城市运⾏', '⽂化教育', '关爱服务', '社区服务', '医疗卫⽣', '绿⾊环保', '在线志愿服务', '国际服务', '其他'],
      objects: window.serviceTarget || ['⼉童', '⻘少年', '孤寡⽼⼈', '残障⼈⼠', '优抚对象', '特困群体', '其他'],
    };

    this.state = {
      showOptionsType: '',
      selectedOption: {
        types: props.types || '',
        categories: '',
        objects: '',
      },
    };
  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  componentWillReceiveProps() {
  }

  componentWillUnmount() {}

  handleFilterHeaderClick(optionType) {
    return () => this.setState({
      ...this.state,
      showOptionsType: this.state.showOptionsType === optionType ? '' : optionType,
    }, () => {
      if (this.state.showOptionsType) {
        this.props.onFilterShow();
      } else {
        this.props.onFilterHide();
      }
    });
  }

  handleOptionSelected(optionType, option) {
    return () => {
      this.setState({
        ...this.state,
        showOptionsType: '',
        selectedOption: {
          ...this.state.selectedOption,
          [optionType]: option === this.state.selectedOption[optionType] ? '' : option,
        },
      }, () => this.props.onFilterChange(this.state.selectedOption));
    };
  }

  renderFilterOptionis(optionType) {
    const options = this.filterConfig[optionType];

    if (!options) {
      return null;
    }

    const selectedOption = this.state.selectedOption[optionType];

    return (
      <ul className="filter-optioins">
        {
          options.map(
            (option, idx) =>
              <li key={idx} className={classnames({ selected: selectedOption === option })}>
                <a onClick={this.handleOptionSelected(optionType, option)}>{option}</a>
                <div className="line1px" />
              </li>)
        }
      </ul>
    );
  }

  render() {
    const { showOptionsType, selectedOption } = this.state;
    const selectedType = selectedOption.types || '项目类型';
    const selectedCategory = selectedOption.categories || '服务类型';
    const selectedObject = selectedOption.objects || '服务对象';

    return (
      <div className="component-project-filter">
        <div className="filter-header">
          <div className="line1px line1px-top" />
          <div className="filter-actions">
            <a className={classnames({ opened: showOptionsType === 'types' })} onClick={this.handleFilterHeaderClick('types')}>
              <span>{selectedType}</span>
            </a>
            <div className="line1px-v" />
            <a className={classnames({ opened: showOptionsType === 'categories' })} onClick={this.handleFilterHeaderClick('categories')}>
              <span>{selectedCategory}</span>
            </a>
            <div className="line1px-v" />
            <a className={classnames({ opened: showOptionsType === 'objects' })} onClick={this.handleFilterHeaderClick('objects')}>
              <span>{selectedObject}</span>
            </a>
          </div>
          <div className="line1px line1px-bottom" />
        </div>
        {this.renderFilterOptionis(showOptionsType)}
        {showOptionsType ? <div className="filter-mask" /> : null}
      </div>
    );
  }
}

Filter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  onFilterShow: PropTypes.func,
  onFilterHide: PropTypes.func,
  types: PropTypes.bool,
};

export default Filter;
