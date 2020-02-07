const url = '/api/posts/';
const url2 = '/api/accounts/';

class PostService {
    //Get Posts
    static async getPosts() {
        const response = await fetch(url);
        const data = await response.json();

        return data.map(post => ({
            ...post,
            createdAt: new Date(post.createdAt)
        }));
    }

    //Get Accounts
    static async getAccounts() {
        const response = await fetch(url2);
        const data = await response.json();

        return data.map(account => ({
            ...account,
            createdAt: new Date(account.createdAt)
        }));
    }

    //Create Posts
    static insertPost(topic, price, location, provider, review) {
        return fetch(url, {
            method: "POST",
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify({
                topic,
                price,
                location,
                provider,
                review
            })
        });
    }

    //Create Account
    static insertAccount(email, password, accType) {
        return fetch(url2, {
            method: "POST",
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify({
                email,
                password,
                accType
            })
        });
    }

  //Delete Posts
  static deletePost(id) {
    return fetch(`${url}${id}`, {
      method: "DELETE"
    });
    }
}

export default PostService