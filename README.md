xml2json


```
const xmlString = `<root>
 <person id="1">
    <name>John Doe</name>
    <age>30</age>
  </person>
 <person id="2">
    <name>Jane Doe</name>
    <age>28</age>
  </person>
</root>`;

const json = xmlToJson(xmlString);
console.log(json);

```
