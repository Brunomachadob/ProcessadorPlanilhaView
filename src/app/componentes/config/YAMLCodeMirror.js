import React from 'react';

import CodeMirror from 'react-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/oceanic-next.css'
import 'codemirror/mode/yaml/yaml';

const codeMirrorOpts = {
    mode: 'yaml',
    theme: 'oceanic-next',
    lineNumbers: true
};

export default function YAMLCodeMirror({ value, onChange, className, options }) {
    return (
        <CodeMirror value={value} onChange={onChange} options={{ ...codeMirrorOpts, ...options }} className={className} />
    )
}