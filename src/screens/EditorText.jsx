import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CKEditor from 'ckeditor4-react';

//editor ckeditor com plugins
CKEditor.editorUrl = "http://localhost:3000/ckeditor/ckeditor.js";

const toolbarGroups = [
    { name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
    { name: 'basicstyles', groups: ['basicstyles'] },
    { name: 'document', groups: ['mode', 'document'] },
    { name: 'tools' },
    { name: 'links', groups: ['links'] },
    { name: 'paragraph', groups: ['list', 'blocks'] },
    { name: 'insert', groups: ['insert'] },
    { name: 'styles', groups: ['styles'] },
];

const EditorText = (props) => {
    const [text, setText] = React.useState('');
    const onEditorChange = async (evt) => {
        setText(await evt.editor.getData());
    };
    return (<>
        <CKEditor
            data={text}
            onChange={onEditorChange}
            config={{ toolbarGroups: toolbarGroups, extraPlugins: 'print' }}
            style={{ float: 'center' }}
        />
    </>);
};

export default EditorText;