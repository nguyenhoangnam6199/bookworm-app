import React, { Component } from 'react';
import logo from "../../assets/404.jpg";
import Paginate from './Paginate';
import { AddCart } from '../store/actions';
import { connect } from 'react-redux';

export class ProductDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            from1: '',
            to1: '',
            total: '',
            id: '1',
            per: '20',
            condition: 'time',
            isAsc: 'false',
            star: '0',
            book: {},
            numOfStar: [],
            sumStar: {},
            review: [],
            page: '1',
            to: '',
            quantity: 1,
            title: '',
            detail: '',
            stars: 1
        }
        this.FunctAll = this.FunctAll.bind(this);
        this.Funct1 = this.Funct1.bind(this);
        this.Funct2 = this.Funct2.bind(this);
        this.Funct3 = this.Funct3.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.FetchData = this.FetchData.bind(this);
        this.FetchData1 = this.FetchData1.bind(this);
        this.Func1 = this.Func1.bind(this);
        this.Func2 = this.Func2.bind(this);
        this.FuncStar = this.FuncStar.bind(this);
        this.addToCart = this.addToCart.bind(this);
        this.toDateString = this.toDateString.bind(this);
        this.setPage = this.setPage.bind(this);
        this.capitalizeFirstLetter=this.capitalizeFirstLetter.bind(this);
    }
    componentDidMount() {
        console.log(this.props.match.params.id)
    }
    componentWillMount() {
        this.FetchData1();

        this.FetchData();
    }
    async FetchData1() {
        await axios.get('/api/book/' + this.props.match.params.id)
            .then(res => {
                this.setState({
                    book: res.data
                });
                // console.log(this.state.book);
            })
            .catch((error) => {
                console.log(error);
            });
        await axios.get('/api/getStar/' + this.props.match.params.id)
            .then(res => {
                this.setState({
                    numOfStar: res.data
                });
                //console.log(this.state.numOfStar);
            })
            .catch((error) => {
                console.log(error);
            });
        await axios.get('/api/getSumStar/' + this.props.match.params.id)
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
        console.log('/api/filterReview/' + this.props.match.params.id + "/" + this.state.star + "/" +
            this.state.condition + "/" + this.state.isAsc + "/" + this.state.per + "?page=" + this.state.page);

        await axios.get('/api/filterReview/' + this.props.match.params.id + "/" + this.state.star + "/" +
            this.state.condition + "/" + this.state.isAsc + "/" + this.state.per + "?page=" + this.state.page)
            .then(res => {
                this.setState({
                    review: res.data.data,
                    page: res.data.current_page,
                    to: res.data.last_page,
                    from1: res.data.from,
                    to1: res.data.to,
                    total: res.data.total
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
        var x = this.state.quantity + 1;
        if (x > 8) {
            x = 8;
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Max book is 8!',
                // footer: '<a href="">Why do I have this issue?</a>'
            })
        }
        this.setState({ quantity: x })
    }

    SubFunction() {
        var x = this.state.quantity - 1;
        if (x < 1) {
            x = 1;
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Min book is 1!',
                // footer: '<a href="">Why do I have this issue?</a>'
            })
        }
        this.setState({ quantity: x })
    }

    async FuncStar(id) {
        var x = document.getElementById(id).id;
        await this.setState(
            {
                condition: 'time',
                star: x,
            }
        )
        this.FetchData();
    }
    async FunctAll() {
        await this.setState(
            {
                condition: 'time',
                star: '0'
            }
        )
        this.setPage("1")
        this.FetchData();
    }

    async addToCart() {
        // console.log(this.state.book)
        await this.props.AddCart({
            product: this.state.book,
            quantity: this.state.quantity
        })
        this.setState({ quantity: 1 })
        Swal.fire(
            'Good job!',
            'Add Cart Successfull !',
            'success'
        )
    }

    Funct1(e) {
        this.setState(
            {
                title: e.target.value
            }
        )
    }

    Funct2(e) {
        this.setState(
            {
                detail: e.target.value
            }
        )
    }

    Funct3(e) {
        this.setState(
            {
                stars: e.target.value
            }
        )
    }

    onSubmit(e) {
        e.preventDefault();
        const x = {
            book_id: this.props.match.params.id,
            review_title: this.state.title,
            review_details: this.state.detail,
            rating_start: this.state.stars
        };
        if (this.state.title.length > 120) {
            //alert("Max title is 120 character !");
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Max title is 120 character!',
                // footer: '<a href="">Why do I have this issue?</a>'
            })
            e.preventDefault();
            return;
        }
        else {
            axios.post("/api/review/", x)
                .then(res => console.log(res.data));
            // alert("Insert Review Successfull !");
            Swal.fire(
                'Good job!',
                'Insert Review Successfull !',
                'success'
            )
            this.FetchData1(),
            this.FetchData();
        }
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    toDateString(string) {
        let date = new Date(string)
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        })
    }
    render() {
        return (
            <div>

                <section className="section-pagetop bg-primary">
                    <div className="container">
                        <h2 style={{ display: 'flex' }} className="title-page text-white">
                            {/* {this.state.book.category.category_name} */}
                            {Object.keys(this.state.book).length === 0 ? "N/A" : this.capitalizeFirstLetter(this.state.book.category.category_name)}
                        </h2>
                    </div>
                </section>

                <br />

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
                            <span style={{ marginLeft: '10px',fontSize: '25px',color: 'red' }}>${this.state.book.final_price}</span>
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
                            (this.state.review.length === 0)
                                ? <div className="col-md-8 rounded" style={{ border: '1px solid', padding: '15px' }}>
                                    <h2>No Review</h2>
                                </div>
                                : <div className="col-md-8 rounded" style={{ border: '1px solid', padding: '15px' }}>
                                    {
                                        (this.state.star === "0")
                                            ? <h5>Customer Reviews</h5>
                                            : <h5>Customer Reviews (Filtered by {this.state.star} star)</h5>
                                    }
                                    <br />

                                    <h5>

                                        {parseFloat(this.state.book.star).toFixed(2)} Star
                                    </h5>

                                    {/* <h5>0 Star</h5> */}
                                    <p>
                                        <span onClick={() => this.FunctAll()}>total (
                                            {Object.keys(this.state.sumStar).length === 0 ? "N/A" : this.state.sumStar.sumofstar}
                                            ) | </span>
                                        {this.state.numOfStar.map(b => (
                                            <span style={{ cursor: "pointer" }} onClick={() => this.FuncStar(b.rating_start)} key={b.rating_start} id={b.rating_start}>
                                                {b.rating_start} star ({b.sl}) | <span> </span>
                                            </span>
                                        ))}

                                    </p>
                                    <div className="row">
                                        <div className="col-4">Showing {this.state.from1} - {this.state.to1} of {this.state.total} reviews</div>
                                        <div className='col-8'>
                                            <select id="sortText" className="custom-select" style={{ float: 'left', width: '60%' }} onClick={() => this.Func1()}>
                                                {/* <option value="sale">Sort by on sale</option> */}
                                                <option value="time1">Sort by date: newest to oldest</option>
                                                <option value="time2">Sort by date: oldest to newest</option>
                                            </select>
                                            <select id="sortNum" defaultValue="20" className="custom-select" style={{ float: 'right', width: '25%', marginRight: '36px' }} onClick={() => this.Func2()}>
                                                <option value="5">Show 5</option>
                                                <option value="15">Show 15</option>
                                                <option value="20">Show 20</option>
                                                <option value="25">Show 25</option>
                                            </select>

                                        </div>
                                    </div>
                                    <br />
                                    <br />
                                    <hr />
                                    <br />
                                    {this.state.review.map(b => (
                                        <div key={b.id}>
                                            <h5 style={{ wordWrap: 'break-word', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                {b.review_title} | <span> </span>
                                                {
                                                    (this.state.star === "0")
                                                        ? b.rating_start
                                                        : (this.state.star)
                                                } Star
                                            </h5>
                                            <p style={{ wordWrap: 'break-word', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{b.review_details}</p>
                                            <p>{this.toDateString(b.review_date)}</p>
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
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlInput1">Add a title</label>
                                    <input required type="text" value={this.state.title} onChange={this.Funct1} className="form-control" id="exampleFormControlInput1" placeholder="Add a Title" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlInput1">Detail please! Your review helps other shoppers</label>
                                    {/* <input type="text" required value={this.state.detail} onChange={this.Funct2} className="form-control" id="exampleFormControlInput1" placeholder="Add a content" /> */}
                                    <textarea required value={this.state.detail} onChange={this.Funct2} placeholder="Add a content" className="form-control" id="exampleFormControlInput1"></textarea>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlSelect1">Select a rating star</label>
                                    <select value={this.state.stars} onChange={this.Funct3} className="form-control" id="exampleFormControlSelect1">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </select>
                                </div>
                                <hr />
                                <button style={{ marginLeft: '55px' }} type="submit" className="btn btn-secondary">Submit Review</button>
                            </form>


                        </div>
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
