import axios from 'axios';

const downloadFile = (fileName) => {

    return new Promise((resolve, reject) => {
        axios.get(process.env.REACT_APP_API_URL + '/download/' + fileName, {
            responseType: 'blob'
        }).then((result) => {
            let link = document.createElement('a')
            link.href = window.URL.createObjectURL(result.data)
            link.download = fileName.split('_')[0] + 'Processada.xlsx'
            link.click();

            resolve();
        }).catch(reject);
    });


}

export {
    downloadFile
}