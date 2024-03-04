export function xmlToJson(xml) {
    // 将XML字符串解析为DOM对象
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xml, "application/xml");

    // 递归地将DOM节点转换为JSON对象
    function nodeToJson(node) {
        const jsonNode = {};
        const attributes = node.attributes;
        const childNodes = node.childNodes;

        if (attributes.length > 0) {
            jsonNode["@attributes"] = {};
            for (let i = 0; i< attributes.length; i++) {
                jsonNode["@attributes"][attributes[i].name] = attributes[i].value;
            }
        }

        if (childNodes.length === 1 && childNodes[0].nodeType === 3) {
            jsonNode["@value"] = childNodes[0].nodeValue;
        } else {
            for (let i = 0; i< childNodes.length; i++) {
                if (childNodes[i].nodeType === 1) {
                    const childNodeName = childNodes[i].nodeName;
                    if (!jsonNode[childNodeName]) {
                        jsonNode[childNodeName] = [];
                    }
                    jsonNode[childNodeName].push(nodeToJson(childNodes[i]));
                }
            }
        }

        return jsonNode;
    }

    return nodeToJson(xmlDoc.documentElement);
}

