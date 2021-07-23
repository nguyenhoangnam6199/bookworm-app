import React, { Component } from 'react';
import logo from "../../assets/404.jpg";
import Paginate from './Paginate';
import { AddCart } from '../store/actions';
import { connect } from 'react-redux';

export class ProductDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '1',
            per: '5',
            condition: 'sale',
            isAsc: 'false',
            star: '1',
            book: {},
            numOfStar: [],
            sumStar: {},
            review: [],
            page: '1',
            to: '',
            quantity: 1
        }
        this.setPage = this.setPage.bind(this);
    }
    componentDidMount() {
        console.log(this.props.match.params.id)
    }
    componentWillMount() {
        this.FetchData1();

        this.FetchData();
    }
    async FetchData1() {
        await axios.get('http://127.0.0.1:8000/api/book/' + this.props.match.params.id)
            .then(res => {
                this.setState({
                    book: res.data
                });
               // console.log(this.state.book);
            })
            .catch((error) => {
                console.log(error);
            });
        await axios.get('http://127.0.0.1:8000/api/getStar/' + this.props.match.params.id)
            .then(res => {
                this.setState({
                    numOfStar: res.data
                });
                //console.log(this.state.numOfStar);
            })
            .catch((error) => {
                console.log(error);
            });
        await axios.get('http://127.0.0.1:8000/api/getSumStar/' + this.props.match.params.id)
            .then(res => {
                this.setState({
                    sumStar: res.data
                });
              //  console.log(this.state.sumStar);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    async FetchData() {
       await axios.get('http://127.0.0.1:8000/api/filterReview/' + this.props.match.params.id + "/" + this.state.star + "/" +
            this.state.condition + "/" + this.state.isAsc + "/" + this.state.per + "?page=" + this.state.page)
            .then(res => {
                this.setState({
                    review: res.data.data,
                    page: res.data.current_page,
                    to: res.data.last_page
                });
                console.log(this.state.review);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    async setPage(number) {
       // console.log("cur page: " + number)
        await this.setState({
            page: number
        })
        this.FetchData()
    }

    async Func1() {
        var x = document.getElementById('sortText').value;
        if (x === "time1") {
            x = "time";
            await this.setState(
                { isAsc: 'false' }
            )
        }
        else if (x === "time2") {
            x = "time";
            await this.setState(
                { isAsc: 'true' }
            )
        }
        else {
            x = "sale";
        }
        await this.setState(
            { condition: x }
        )
        this.FetchData();
    }

    async Func2() {
        var x = document.getElementById('sortNum').value;
        await this.setState(
            { per: x }
        )
        this.FetchData();
    }

    AddFunction() {
        this.setState({ quantity: this.state.quantity + 1 })
    }

    SubFunction() {
        this.setState({ quantity: this.state.quantity - 1 })
    }

    async FuncStar(id) {
        var x = document.getElementById(id).id;
        await this.setState(
            {
                star: x,
            }
        )
        this.FetchData();
    }

    async addToCart() {
        // console.log(this.state.book)
        await this.props.AddCart({
            product: this.state.book,
            quantity: this.state.quantity
        })
        this.setState({ quantity: 1 })
    }

    render() {
        return (
            <div className="container">
                <div key={this.state.book.id} className="row">
                    <div className="col-md-8 rounded" style={{ border: '1px solid', padding: '15px' }}>
                        <div className="col-5" style={{ float: 'left' }}>
                            <div className="card">
                                {
                                    (this.state.book.book_cover_photo === null)
                                        ? <img style={{ maxHeight: '200px' }} src={logo} className="card-img-top" alt="..." />
                                        : <img style={{ maxHeight: '200px' }} src={"../../assets/bookcover/" + this.state.book.book_cover_photo + ".jpg"} className="card-img-top" alt="..." />
                                }

                                <div className="card-body">
                                    <h5 style={{ fontSize: '15px' }} className="card-title">By (author):
                                        {Object.keys(this.state.book).length === 0 ? "N/A" : this.state.book.author.author_name}
                                    </h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-7" style={{ float: 'right' }}>
                            <h5>{this.state.book.book_title}</h5>
                            <p>{this.state.book.book_summary}</p>
                        </div>
                    </div>
                    <div className="col-md-3 rounded" style={{ marginLeft: '80px', border: '1px solid', padding: '15px' }}>
                        {(this.state.book.book_price !== this.state.book.final_price)
                            ? <del>${this.state.book.book_price}</del>
                            : ""
                        }
                        <span style={{ fontSize: '25px' }}>${this.state.book.final_price}</span>
                        <hr style={{ margin: 'auto' }} />
                        <br />
                        <br />
                        <h5>Quantity</h5>
                        <div>
                            <div className="input-group number-spinner" style={{ width: '80%', margin: 'auto' }}>
                                <span className="input-group-btn">
                                    <button id="btnSub" className="btn btn-default" data-dir="dwn" onClick={() => this.SubFunction()}>-</button>
                                </span>
                                <input id="number" type="text" className="form-control text-center" value={this.state.quantity} readOnly />
                                <span className="input-group-btn">
                                    <button id="btnAdd" className="btn btn-default" data-dir="up" onClick={() => this.AddFunction()}>+</button>
                                </span>
                            </div>
                            <button
                                type="button" className="btn btn-secondary"
                                style={{ marginTop: '40px', width: '80%', marginLeft: '25px' }}
                                onClick={() => this.addToCart()}
                            >
                                Add To Cart
                            </button>
                        </div>
                    </div>
                </div>
                <br />
                <br />
                <div className="row">
                    {
                        ( this.state.review.length === 0)
                            ? <div className="col-md-8 rounded" style={{ border: '1px solid', padding: '15px' }}>
                                <h2>No Review</h2>
                            </div>
                            : <div className="col-md-8 rounded" style={{ border: '1px solid', padding: '15px' }}>
                                <h5>Customer Reviews (Filter by {this.state.star} star)</h5>
                                <br />

                                <h5>{parseFloat(this.state.book.star)} Star</h5>

                                {/* <h5>0 Star</h5> */}
                                <p>total (
                                    {Object.keys(this.state.sumStar).length === 0 ? "N/A" : this.state.sumStar.sumofstar}
                                    ) |
                                    {this.state.numOfStar.map(b => (
                                        <span onClick={() => this.FuncStar(b.rating_start)} key={b.rating_start} id={b.rating_start}>
                                            {b.rating_start} star ({b.sl}) |
                                        </span>
                                    ))}

                                </p>
                                <div>
                                    <p style={{ float: 'left' }}></p>
                                    <div className='col-8' style={{ float: 'right' }}>
                                        <select id="sortText" className="custom-select" style={{ float: 'left', width: '60%' }} onClick={() => this.Func1()}>
                                            <option value="sale">Sort by on sale</option>
                                            <option value="time1">Sort by date: newest to oldest</option>
                                            <option value="time2">Sort by date: oldest to newest</option>
                                        </select>
                                        <select id="sortNum" className="custom-select" style={{ float: 'right', width: '25%', marginRight: '36px' }} onClick={() => this.Func2()}>
                                            <option value="5">Show 5</option>
                                            <option value="10">Show 10</option>
                                            <option value="15">Show 15</option>
                                        </select>

                                    </div>
                                </div>
                                <br />
                                <br />
                                <hr />
                                <br />
                                {this.state.review.map(b => (
                                    <div key={b.id}>
                                        <h5>{b.review_title} | {this.state.star} Star</h5>
                                        <p>{b.review_details}</p>
                                        <p>{b.review_date}</p>
                                        <hr />
                                        <br />
                                    </div>
                                ))}
                                <Paginate
                                    className="text-center"
                                    page_count={this.state.to}
                                    current_page={this.state.page}
                                    setPage={this.setPage}
                                />
                            </div>
                    }

                    <div className="col-md-3 rounded" style={{ marginLeft: '80px', border: '1px solid', padding: '15px', height: '455px' }}>
                        <h5>Write a Review</h5>
                        <hr style={{ margin: 'auto' }} />
                        <br />
                        <br />
                        <form>
                            <div className="form-group">
                                <label htmlFor="exampleFormControlInput1">Add a title</label>
                                <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Add a Title" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleFormControlInput1">Detail please! Your review helps other shoppers</label>
                                <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Add a content" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleFormControlSelect1">Select a rating star</label>
                                <select className="form-control" id="exampleFormControlSelect1">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </select>
                            </div>
                        </form>
                        <hr />
                        <button style={{ marginLeft: '55px' }} type="button" className="btn btn-secondary">Submit Review</button>
                    </div>
                </div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        AddCart: item => dispatch(AddCart(item))
    }
}

export default connect(null, mapDispatchToProps)(ProductDetail)
