import React from 'react';
import { View, Text, Dimensions, Image , TouchableOpacity} from 'react-native';

const styles = {
  dot: {
    borderRadius: 100,
    padding: 5,
    height: 10,
    width: 10,
    position: 'absolute',
    alignSelf: 'flex-end',
    marginBottom: 5,
    marginLeft: 'auto',
    top: 20,
    left: Dimensions.get('window').width - 90,
  }
}

const RepoDetails = (props) => {
  return props.repository.map((repos, i) => {
    return (
      <View style={{ display: 'flex', flex: 1, borderBottomColor: '#D3D3D3', borderBottomWidth: 1, marginBottom: 20, marginTop: 10 }} key={i}>
        <Text style={{ marginBottom: 15, fontSize: 16 }}>Repo Name: {repos.name}</Text>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <Image source={{ uri: repos.owner.avatarUrl }} style={{width: 66, height: 58}} />
          <Text style={{ marginLeft: 10, fontSize: 16 }}>Owner: {repos.owner.login}</Text>
          <TouchableOpacity style={{ marginLeft: 'auto', marginRight: 10, marginTop: 5 }} onPress={() => props.onRemoveRepo(i)}>
            <Text>Remove Repo</Text>
          </TouchableOpacity>
        </View>
        <Text style={{ marginTop: 15 }}>Description: {repos.description}</Text>
        <Text style={{ marginTop: 15 }}>Pushed At: {repos.pushedAt}</Text>
        <Text style={{ marginTop: 10 }}>Stars(Star Gazers): {repos.stargazers.totalCount}</Text>
        <Text style={{ marginTop: 10 }}>Fork Count: {repos.forkCount}</Text>
        <Text style={{ marginTop: 15, marginBottom: 10 }}>Primary Language: {repos.primaryLanguage.name}</Text>
        <View style={[styles.dot, {backgroundColor: repos.primaryLanguage.color},]} />
      </View>
    )
  })
}

export default RepoDetails;
