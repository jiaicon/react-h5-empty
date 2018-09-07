/* eslint  "class-methods-use-this":"off",
"jsx-a11y/no-static-element-interactions":"off",
"react/no-array-index-key":"off" */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import classnames from 'classnames';
import './index.css';
import Link from '../link/link';
import Image from '../image/image';

class Projects extends React.Component {

    constructor(props) {
        super(props);
        autoBind(this);
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    componentWillReceiveProps() {
    }

    componentWillUnmount() { }

    render() {
        const { data } = this.props;
        if (!data) {
            return null;
        } else if (data && !data.length) {
            return <div className="data-empty-tip">目前还没有商品哦</div>;
        }
        return (
            <ul className="component-shopItem">
                {
                    data.map((item, index) => {
                        return(
                            <li key={index}>
                                <Link to={`/shop/goods/${item.id}`}>
                                    <div className="component-shopItem-container">
                                        <Image src={item.g_img} className="image" defaultSrc="/images/my/banner.png" />
                                        <div className="component-shopItem-content">
                                            <div className="component-shopItem-name">{item.g_name}</div>
                                            <div className="component-shopItem-condition">{item.condition}</div>
                                            <div className="component-shopItem-price-container">
                                                <div className="new">{item.points}</div>
                                                <div className="fonts">星币</div>
                                                <div className="old">¥{item.price}元</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="line1px" />
                                </Link>
                            </li>
                        )
                    })
                }


            </ul>
        );
    }
}

Projects.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({

        })),
};

export default Projects;
