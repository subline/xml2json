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
            _.each(attributes, (attribute) => {
                jsonNode["@attributes"][attribute.name] = attribute.value;
            });
        }

        if (childNodes.length === 1 && childNodes[0].nodeType === 3) {
            jsonNode["@value"] = childNodes[0].nodeValue;
        } else {
            _.each(childNodes, (childNode) => {
                if (childNode.nodeType === 1) {
                    const childNodeName = childNode.nodeName;
                    if (!jsonNode[childNodeName]) {
                        jsonNode[childNodeName] = [];
                    }
                    jsonNode[childNodeName].push(nodeToJson(childNode));
                }
            });
        }

        return jsonNode;
    }

    return nodeToJson(xmlDoc.documentElement);
}

