import token from "assets/Config/jwtChecker";

const headerConfig = {
    headers: { authorization: `JWT ${token}` }
}

export default headerConfig