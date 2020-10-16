import React, {FC, useState, useCallback, useRef} from 'react';

interface Props {}
interface SubmitProps {
    data: {[key: string]: string}
}

const API_URL = 'http://localhost/api';

export const Form: FC<Props> = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const [data, setData] = useState<{[key: string]: string}>({});

    const handleChange = useCallback((event) => {
        setData({...data, [event.target.name]: event.target.value});
    }, [data]);

    const handleSubmit = (event: any) => {
        event.preventDefault();

        submit();
    };

    const submit = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
    
        return fetch(`${API_URL}/share`, requestOptions)
            .then((response: Response) => {
                if (response.status !== 201) {
                    return Promise.reject(response.statusText);
                }
                return response;
            })
            .then(response => {
                // Display success message
                window.alert('success');
                formRef?.current?.reset();
            })
            .catch(error => {
                window.alert('Oops!! An error occured!');
                formRef?.current?.reset();
            });
    }

    return (
        <form ref={formRef} className={'form'} onSubmit={handleSubmit}>
            <h2 className="form__title">Send to a Friend</h2>
            <p className="form__info">Share this great deal with friends</p>
            <div className="form__contents">
                <div className={'form__control input'}>
                    <label htmlFor="name">Your name<span className={'input__label input__label-is-required'}>*</span></label>
                    <input name="name" type="text" className="input__control" onChange={handleChange}  />
                </div>
                <div className={'form__control input'}>
                    <label htmlFor="friend_name">Friend's name<span className={'input__label input__label-is-required'}>*</span></label>
                    <input name="friend_name" type="text" className="input__control" onChange={handleChange}  />
                </div>
                <div className={'form__control input'}>
                    <label htmlFor="friend_email">Friend's email<span className={'input__label input__label-is-required'}>*</span></label>
                    <input name="friend_email" type="email" className="input__control" onChange={handleChange}  />
                </div>
                <div className={'form__control input'}>
                    <button type="submit" className={'input__button'}>SUBMIT</button>
                </div>
            </div>
        </form>
    )
}