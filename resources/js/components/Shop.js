import React, { Component, useEffect } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import Paginate from './Paginate';
import logo from "../../../public/images/404.jpg";


export default class Shop extends Component {
    constructor(props) {
        super(props)
        this.state = {
            filter: '',
            filterValue: undefined,
            per: '20',
            page: '1',
            isAsc: 'false',
            sort: 'sale',
            total: 0,
            from: 0,
            to: 0,
            page_count: 0,
            category: [],
            author: [],
            listpro: [],
            star: [
                { id: 1, des: '1 Star' },
                { id: 2, des: '2 Star' },
                { id: 3, des: '3 Star' },
                { id: 4, des: '4 Star' },
                { id: 5, des: '5 Star' }
            ]
        };
        // this.FuntionBy = this.FuntionBy.bind(this);
        this.setPage = this.setPage.bind(this);
    }


    componentWillMount() {
        axios.get('http://127.0.0.1:8000/api/category')
            .then(res => {
                this.setState({
                    category: res.data
                });
                //console.log(this.state.category);
            })
            .catch((error) => {
                console.log(error);
            });
        axios.get('http://127.0.0.1:8000/api/author')
            .then(res => {
                this.setState({
                    author: res.data
                });
                // console.log(this.state.author);
            })
            .catch((error) => {
                console.log(error);
            });

        this.FetcData()
    }

    FetcData() {
        let config = {
            params: {
                // $loai, $condition, $category, $per, $isAscending
                filter: this.state.filter,
                filterValue: this.state.filterValue,
                sort: this.state.sort,
                // isAscending: this.state.isAsc,
                per: this.state.per,
                page: this.state.page
            }
        }

        axios.get('http://127.0.0.1:8000/api/filterby/', config)
            .then(res => {
                this.setState({
                    listpro: res.data.data,
                    page: res.data.current_page,
                    page_count: res.data.last_page,
                    from: res.data.from,
                    to: res.data.to,
                    total: res.data.total
                });
                console.log(this.state.listpro);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    async setPage(number) {
        console.log("cur page: " + number)
        await this.setState({
            page: number
        })
        this.FetcData()
    }


    async filterCategory(cate) {
        await this.setState({
            filter: "category",
            filterValue: cate
        })

        this.FetcData()
    }

    async filterAuthor(author) {
        await this.setState({
            filter: "author",
            filterValue: author
        })

        this.FetcData()
    }

    async filterStar(star) {
        await this.setState({
            filter: "star",
            filterValue: star
        })

        this.FetcData()
    }

    async changeSort(event) {
        let value = event.target.value
        console.log(value)
        await this.setState({
            sort: value
        })

        this.FetcData()
    }

    async changePerPage(event) {
        await this.setState({
            per: event.target.value
        })
        this.FetcData()
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    getFilerTitle() {
        // if(this.state.filter == "") return;

        let filter_name = this.capitalizeFirstLetter(this.state.filter)
        let filter_value = ""
        switch (this.state.filter) {
            case 'category':
                let category = this.state.category.find(item => {
                    return (item.id == this.state.filterValue)
                })
                filter_value = this.capitalizeFirstLetter(category.category_name)
                break;

            case 'author':
                let author = this.state.author.find(item => {
                    return (item.id == this.state.filterValue)
                })
                filter_value = this.capitalizeFirstLetter(author.author_name)
                break;

            case 'star':
                let star = this.state.star.find(item => {
                    return (item.id == this.state.filterValue)
                })
                filter_value = this.capitalizeFirstLetter(star.des)
                break;
        
            default:
                return;
                break;
        }

        return `( Filtered by ${filter_name}: ${filter_value} )`
    }

    render() {
        return (
            <div>
                <section className="section-pagetop bg-primary">
                    <div className="container">
                        <h2 style={{display: 'flex'}} className="title-page text-white">
                            Books   
                            <h5 style={{marginTop:'10px', marginLeft:'5px'}}>{this.getFilerTitle()} </h5>
                        </h2>
                    </div>
                </section>
                
                <br />
                <div className="container">
                    <div className="row">
                        <div className="col-2">
                            <b>Filter By</b>
                            <div className="accordion" id="accordionExample">
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingOne">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                            Category
                                        </button>
                                    </h2>
                                    <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                        {this.state.category.map(cate => (
                                            <div className="accordion-body" style={{ cursor: "pointer" }} key={cate.id} value={cate.id} id={cate.id} onClick={() => this.filterCategory(cate.id)}>
                                                {/* {cate.category_name.toUpperCase()} */}
                                                {this.capitalizeFirstLetter(cate.category_name)}
                                            </div>
                                        ))}

                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingTwo">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                            Author
                                        </button>
                                    </h2>
                                    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">

                                        {this.state.author.map(auth => (
                                            <div key={auth.id} style={{ cursor: "pointer" }} className="accordion-body" value={auth.id} id={auth.id} onClick={() => this.filterAuthor(auth.id)}>
                                                {/* {auth.author_name.toUpperCase()} */}
                                                {this.capitalizeFirstLetter(auth.author_name)}
                                            </div>
                                        ))}

                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingThree">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                            Rating View
                                        </button>
                                    </h2>
                                    <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">

                                        {this.state.star.map(st => (
                                            <div key={st.id} style={{ cursor: "pointer" }} className="accordion-body" value={st.id} id={st.id} onClick={() => this.filterStar(st.id)}>
                                                {st.des}
                                                {/* {this.capitalizeFirstLetter(st.des)} */}
                                            </div>
                                        ))}

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-10">
                            <div className="row">
                                <div className="col-md-6">Showing {this.state.from} - {this.state.to} of {this.state.total} books</div>
                                <div className="col-md-4" >
                                    <select id="sortch" className="custom-select" onChange={(e) => this.changeSort(e)}>
                                        <option value="sale">Sort By On Sale</option>
                                        <option value="popular">Sort By Popularity</option>
                                        <option value="price-asc">Sort By Price: low to high</option>
                                        <option value="price-desc">Sort By Price: hight to low</option>
                                    </select>
                                </div>
                                <div className="col-md-2" >
                                    <select id="numch" defaultValue="20" className="custom-select" onChange={(e) => this.changePerPage(e)}>
                                        <option value="5">Show 5</option>
                                        <option value="15">Show 15</option>
                                        <option value="20">Show 20</option>
                                        <option value="25">Show 25</option>
                                    </select>
                                </div>
                            </div>
                            <br />
                            {/* Contents */}
                            <div className="row">
                                {this.state.listpro.map(book => (
                                    <div className="col-3">
                                        <Link key={book.id} to={"/book/" + book.id}>
                                            <div className="card" style={{ minHeight: '200px', marginRight: '10px' }} >
                                                {
                                                    (book.book_cover_photo==null)
                                                        ? <img style={{ minHeight: '200px' }} className="card-img-top" src={logo} alt={book.book_title + " photo"} />
                                                        : <img style={{ maxHeight: '200px' }} className="card-img-top" src={"images/" + book.book_cover_photo + ".jpg"} alt={book.book_title + " photo"} />
                                                }
                                                <div className="card-body">
                                                    <h5 className="card-title" style={{ wordWrap: 'break-word', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                        {book.book_title}
                                                    </h5>
                                                    <p className="card-text" style={{minHeight: '70px'}}>{book.author_name}</p>
                                                </div>
                                                <ul className="list-group list-group-flush">
                                                    <li className="list-group-item">
                                                        {(book.book_price !== book.final_price)
                                                            ? <del>${book.book_price}</del>
                                                            : ""
                                                        }
                                                        <span style={{marginLeft: '10px', fontSize: '25px', color: 'red'}}>${book.final_price}</span>
                                                    </li>
                                                </ul>
                                            </div>
                                            <br />
                                        </Link>
                                    </div>
                                ))}
                            </div>
                            <br />
                            <Paginate
                                className="text-center"
                                page_count={this.state.page_count}
                                current_page={this.state.page}
                                setPage={this.setPage}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
