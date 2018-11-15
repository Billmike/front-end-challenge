import React from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, TouchableOpacity, Text, TextInput, KeyboardAvoidingView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import ModalDropdown from 'react-native-modal-dropdown';
import RepoDetails from '../RepoDetails';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import sortRepos, { sortByName, pushedAt, starGazers, addRepo, removeRepo } from '../../redux/action/repoActions';
import Modal from '../Modal';

export class Main extends React.Component {
  state = {
    repoName: 'Empty',
    repoDesc: 'Empty',
    repoLang: 'Nothing',
    name: 'No Name',
    pushedAt: `${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}`,
    repos: [],
    isLoading: true,
    sortValue: 'Name',
    isModalVisble: false
  }

  /**
   * This method is responsible for determining what sorting action gets called
   * based on the value passed to the Drop-down method
   */
  sortMethod = (index, value) => {
    this.setState({sortValue: value}, () => {
      if (value === "Fork Count") {
        return this.props.sortRepos(this.state.sortValue)
      } else if (value === "Name") {
        return this.props.sortByName(value)
      } else if (value === "Pushed At") {
        return this.props.pushedAt(value)
      } else if (value === "Star Count") {
        return this.props.starGazers(value)
      }
    })
  }

  /**
   * This method toggles the modal visibility
   */
  toggleModal = (value) => {
    this.setState({ isModalVisble: value })
  }

  /**
   * Listens for change on the input field for Repo Name
   */
  onInputFieldRepoNameChange = (text) => {
    this.setState({ repoName: text })
  }

  /**
   * Listens for change on the input field for Repo description
   */
  onInputFieldDescChange = (text) => {
    this.setState({ repoDesc: text })
  }

  /**
   * Listens for change on the input field for Repo Language
   */
  onInputFieldLangChange = (text) => {
    this.setState({ repoLang: text })
  }

  /**
   * Listens for change on the input field for Owner name
   */
  onInputFieldNameChange = (text) => {
    this.setState({ name: text })
  }

  /**
   * This method is responsible for adding a new repo to the existing repos
   */
  addRepoToArray = () => {
    let newObj = {};
    const { name, repoName, repoDesc, repoLang, pushedAt } = this.state
    newObj = {
      name: repoName,
      description: repoDesc,
      forkCount: 0,
      stargazers: {
        totalCount: 0
      },
      pushedAt: pushedAt,
      isPrivate: false,
      primaryLanguage: {
        name: repoLang,
        color: '#000'
      },
      owner: {
        login: name,
        avatarUrl: 'https://avatars2.githubusercontent.com/u/6373663?v=4'
      }
    }
    this.props.addRepo(newObj)
    this.setState({ isModalVisble: false })
  }

  /**
   * This method handles the removal of existing repos
   */
  onRemoveRepo = (index) => {
    this.props.removeRepo(index)
  }

  render() {
    const { isModalVisble } = this.state;
    return (
      <ScrollView style={{ marginLeft: 15, marginRight: 15 }}>
        <View style={{ marginTop: 50 }} />
        <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 15 }}>
        <ModalDropdown
          defaultValue="Select an attribute to sort by"
          selectedValue={this.state.sortValue}
          options={['Name', 'Fork Count', 'Pushed At', 'Star Count']}
          onSelect={this.sortMethod}
        />
        <TouchableOpacity style={{ marginLeft: 'auto', marginRight: 15 }} onPress={() => this.toggleModal(true)}>
          <Text>Add new repo</Text>
        </TouchableOpacity>
        </View>
        <RepoDetails
          repository={this.props.repository}
          onRemoveRepo={this.onRemoveRepo}
          />
        {isModalVisble && (
          <Modal isVisible={isModalVisble} onBackdropPress={() => this.toggleModal(false)}>
            <KeyboardAvoidingView enabled behavior="padding">
            <View style={{ backgroundColor: '#FFF', height: 450, borderRadius: 8, display: 'flex' }}>
              <Text style={{ textAlign: 'center', fontSize: 16, marginTop: 10 }}>Add Repo</Text>
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  alignSelf: 'flex-end',
                  right: 15,
                  top: 5
                }}
                onPress={() => this.toggleModal(false)}
              >
              <Ionicons
                name="ios-close"
                size={30}
              />
              </TouchableOpacity>
              <TextInput
                style={{
                  marginBottom: 15,
                  marginTop: 15,
                  borderBottomColor: '#D3D3D3',
                  borderBottomWidth: 1,
                  marginRight: 15,
                  marginLeft: 20,
                  paddingBottom: 10
                  }}
                placeholder="Repo name"
                onChangeText={this.onInputFieldRepoNameChange}
              />
              <TextInput
                style={{
                  marginBottom: 15,
                  marginTop: 15,
                  borderBottomColor: '#D3D3D3',
                  borderBottomWidth: 1,
                  marginRight: 15,
                  marginLeft: 20,
                  paddingBottom: 10
                  }}
                placeholder="Repo description"
                onChangeText={this.onInputFieldDescChange}
              />
              <TextInput
                style={{
                  marginBottom: 15,
                  marginTop: 15,
                  borderBottomColor: '#D3D3D3',
                  borderBottomWidth: 1,
                  marginRight: 15,
                  marginLeft: 20,
                  paddingBottom: 10
                  }}
                placeholder="Repo Language"
                onChangeText={this.onInputFieldLangChange}
              />
              <TextInput
                style={{
                  marginBottom: 15,
                  marginTop: 15,
                  borderBottomColor: '#D3D3D3',
                  borderBottomWidth: 1,
                  marginRight: 15,
                  marginLeft: 20,
                  paddingBottom: 10
                  }}
                placeholder="Repo Owner Name"
                onChangeText={this.onInputFieldNameChange}
              />
              <TouchableOpacity style={{
                backgroundColor: '#D3D3D3',
                marginLeft: 20,
                marginRight: 10,
                paddingTop: 5,
                paddingBottom: 5,
                borderRadius: 8
                }}
                onPress={this.addRepoToArray}
              >
                <Text style={{ textAlign: 'center', fontSize: 16 }}>Add</Text>
              </TouchableOpacity>
            </View>
            </KeyboardAvoidingView>
          </Modal>
        )}
      </ScrollView>
    )
  }
}

const mapStateToProps = state => {
  return {
    repository: state.repo.data
  }
}

export default connect(mapStateToProps, { sortRepos, sortByName, pushedAt, starGazers, addRepo, removeRepo })(Main);
