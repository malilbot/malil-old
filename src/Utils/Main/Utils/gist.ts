import centra from 'centra'


export const gist = async function(name: any, content: any){
    let files: { [key: string]: { content: string } } = {};
      files[name] = {
        content: content || 'oops something went wrong :(',
      };
    const body = {
      description: `Trickedbot™️`,
      public: false,
      files,
    };
        let gist = await(
                  await centra("https://api.github.com/gists", "POST")
          .header("User-Agent", "Malil")
          .header("Authorization", `token ${process.env.gist}`)
          .body(body, "json")
          .send()
        ).json();
        const out = `https://gist.github.com/${gist.id}/raw`
        return out

      

        }