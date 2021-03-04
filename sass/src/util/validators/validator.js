const VALIDATOR_REQUIRE = 'REQUIRE';

export const REQUIRE = () => ({type: VALIDATOR_REQUIRE});

export const validate = (value, validators) => {
    let isValid = true
    for(const validator of validators){
        if(validator.type === VALIDATOR_REQUIRE){
            isValid = isValid && value.trim().length > 0
        }
    }
    return isValid
}