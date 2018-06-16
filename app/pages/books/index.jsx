import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as APIs from '@apis'
import { sample } from '@actions'
import { actions } from '@actions'

const mapStateToProps = (store) => {
  return {
    store,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getBooks: bindActionCreators(APIs.getBooks, dispatch),
  }
}

@connect(mapStateToProps, mapDispatchToProps)
class Books extends Component {
  constructor(props) {
    super(props)
    this.state = {
      listLoading: true,
      booksList: []
    }
  }

  componentDidMount () {
    this.props.getBooks()
    .then(({ data }) => this.setState({
      listLoading: false,
      booksList: data,
    }))
  }

  render () {
    return (
      <div>
        Books
      </div>
    )
  }
}

export default Books
