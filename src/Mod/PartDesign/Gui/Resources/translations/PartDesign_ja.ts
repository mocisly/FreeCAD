<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE TS>
<TS version="2.1" language="ja" sourcelanguage="en">
  <context>
    <name>App::Property</name>
    <message>
      <location filename="../../../App/FeatureHelix.cpp" line="76"/>
      <source>The center point of the helix' start; derived from the reference axis.</source>
      <translation>参照軸から決定されるらせん開始位置の中心点</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureHelix.cpp" line="78"/>
      <source>The helix' direction; derived from the reference axis.</source>
      <translation>参照軸から決定されるらせん方向</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureHelix.cpp" line="80"/>
      <source>The reference axis of the helix.</source>
      <translation>らせんの参照軸</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureHelix.cpp" line="82"/>
      <source>The helix input mode specifies which properties are set by the user.
Dependent properties are then calculated.</source>
      <translation>らせん入力モードでは、どのプロパティをユーザー設定とするかを指定します。
この時、依存プロパティが計算されます。</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureHelix.cpp" line="86"/>
      <source>The axial distance between two turns.</source>
      <translation>2つの巻き間の軸距離</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureHelix.cpp" line="88"/>
      <source>The height of the helix' path, not accounting for the extent of the profile.</source>
      <translation>プロファイル範囲に基づかないらせんパスの高さ</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureHelix.cpp" line="90"/>
      <source>The number of turns in the helix.</source>
      <translation>らせんの巻き数</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureHelix.cpp" line="93"/>
      <source>The angle of the cone that forms a hull around the helix.
Non-zero values turn the helix into a conical spiral.
Positive values make the radius grow, negative shrinks.</source>
      <translation type="unfinished">The angle of the cone that forms a hull around the helix.
Non-zero values turn the helix into a conical spiral.
Positive values make the radius grow, negative shrinks.</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureHelix.cpp" line="98"/>
      <source>The growth of the helix' radius per turn.
Non-zero values turn the helix into a conical spiral.</source>
      <translation>1巻きあたりのらせん半径の増加率。
ゼロ以外の値では、らせんが円錐形らせんになります。</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureHelix.cpp" line="101"/>
      <source>Sets the turning direction to left handed,
i.e. counter-clockwise when moving along its axis.</source>
      <translation>回転方向を左手系に設定。
つまり軸に沿って移動する時に反時計回りになります。</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureHelix.cpp" line="104"/>
      <source>Determines whether the helix points in the opposite direction of the axis.</source>
      <translation>らせんの点を軸反対方向に配置するかどうかを指定</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureHelix.cpp" line="106"/>
      <source>If set, the result will be the intersection of the profile and the preexisting body.</source>
      <translation>設定されている場合、プロファイルと既存ボディーの交点となります。</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureHelix.cpp" line="108"/>
      <source>If false, the tool will propose an initial value for the pitch based on the profile bounding box,
so that self intersection is avoided.</source>
      <translation>False の場合、ツールは自己交差を回避するようにプロファイルのバウンディングボックスに基づいてピッチの初期値を提案します。</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureHelix.cpp" line="111"/>
      <source>Fusion Tolerance for the Helix, increase if helical shape does not merge nicely with part.</source>
      <translation>らせんの結合トレランス。らせん形状がパーツとうまく結合しない場合には増やしてください。</translation>
    </message>
    <message>
      <location filename="../../../InvoluteGearFeature.py" line="98"/>
      <source>Number of gear teeth</source>
      <translation>歯数</translation>
    </message>
    <message>
      <location filename="../../../InvoluteGearFeature.py" line="104"/>
      <source>Pressure angle of gear teeth</source>
      <translation>歯の圧力角</translation>
    </message>
    <message>
      <location filename="../../../InvoluteGearFeature.py" line="101"/>
      <source>Module of the gear</source>
      <translation>歯車のモジュール</translation>
    </message>
    <message>
      <location filename="../../../InvoluteGearFeature.py" line="108"/>
      <source>True=2 curves with each 3 control points, False=1 curve with 4 control points.</source>
      <translation>True=それぞれ3つの制御点を持つ2曲線、False=4つの制御点を持つ1曲線</translation>
    </message>
    <message>
      <location filename="../../../InvoluteGearFeature.py" line="111"/>
      <source>True=external Gear, False=internal Gear</source>
      <translation>True=外歯車、False=内歯車</translation>
    </message>
    <message>
      <location filename="../../../InvoluteGearFeature.py" line="115"/>
      <source>The height of the tooth from the pitch circle up to its tip, normalized by the module.</source>
      <translation>モジュールによって正規化された、ピッチ円から歯先までの歯の高さ</translation>
    </message>
    <message>
      <location filename="../../../InvoluteGearFeature.py" line="119"/>
      <source>The height of the tooth from the pitch circle down to its root, normalized by the module.</source>
      <translation>モジュールによって正規化された、ピッチ円から歯元までの歯の高さ</translation>
    </message>
    <message>
      <location filename="../../../InvoluteGearFeature.py" line="123"/>
      <source>The radius of the fillet at the root of the tooth, normalized by the module.</source>
      <translation>モジュールによって正規化された、歯の根元のフィレットの半径</translation>
    </message>
    <message>
      <location filename="../../../InvoluteGearFeature.py" line="127"/>
      <source>The distance by which the reference profile is shifted outwards, normalized by the module.</source>
      <translation>モジュールによって正規化された、参照プロファイルを外方向にシフトする距離</translation>
    </message>
  </context>
  <context>
    <name>CmdPartDesignAdditiveHelix</name>
    <message>
      <location filename="../../Command.cpp" line="1506"/>
      <source>PartDesign</source>
      <translation>パートデザイン</translation>
    </message>
    <message>
      <location filename="../../Command.cpp" line="1507"/>
      <source>Additive helix</source>
      <translation>加算らせん</translation>
    </message>
    <message>
      <location filename="../../Command.cpp" line="1508"/>
      <source>Sweep a selected sketch along a helix</source>
      <translation>選択したスケッチをらせん状にスイープ</translation>
    </message>
  </context>
  <context>
    <name>CmdPartDesignAdditiveLoft</name>
    <message>
      <location filename="../../Command.cpp" line="1411"/>
      <source>PartDesign</source>
      <translation>パートデザイン</translation>
    </message>
    <message>
      <location filename="../../Command.cpp" line="1412"/>
      <source>Additive loft</source>
      <translation>加算ロフト</translation>
    </message>
    <message>
      <location filename="../../Command.cpp" line="1413"/>
      <source>Loft a selected profile through other profile sections</source>
      <translation>選択されたプロファイルを別のプロファイル断面を通過するようにロフト</translation>
    </message>
  </context>
  <context>
    <name>CmdPartDesignAdditivePipe</name>
    <message>
      <location filename="../../Command.cpp" line="1315"/>
      <source>PartDesign</source>
      <translation>パートデザイン</translation>
    </message>
    <message>
      <location filename="../../Command.cpp" line="1316"/>
      <source>Additive pipe</source>
      <translation>加算パイプ</translation>
    </message>
    <message>
      <location filename="../../Command.cpp" line="1317"/>
      <source>Sweep a selected sketch along a path or to other profiles</source>
      <translation>選択したスケッチを、パスや他のプロファイルに沿ってスイープ</translation>
    </message>
  </context>
  <context>
    <name>CmdPartDesignBody</name>
    <message>
      <location filename="../../CommandBody.cpp" line="87"/>
      <source>PartDesign</source>
      <translation>パートデザイン</translation>
    </message>
    <message>
      <location filename="../../CommandBody.cpp" line="88"/>
      <source>Create body</source>
      <translation>ボディーを作成</translation>
    </message>
    <message>
      <location filename="../../CommandBody.cpp" line="89"/>
      <source>Create a new body and make it active</source>
      <translation>新しいボディーを作成してそれをアクティブ化</translation>
    </message>
  </context>
  <context>
    <name>CmdPartDesignBoolean</name>
    <message>
      <location filename="../../Command.cpp" line="2319"/>
      <source>PartDesign</source>
      <translation>パートデザイン</translation>
    </message>
    <message>
      <location filename="../../Command.cpp" line="2320"/>
      <source>Boolean operation</source>
      <translation>ブーリアン演算</translation>
    </message>
    <message>
      <location filename="../../Command.cpp" line="2321"/>
      <source>Boolean operation with two or more bodies</source>
      <translation>複数のボディーを使用したブーリアン演算</translation>
    </message>
  </context>
  <context>
    <name>CmdPartDesignCS</name>
    <message>
      <location filename="../../Command.cpp" line="247"/>
      <source>PartDesign</source>
      <translation>パートデザイン</translation>
    </message>
    <message>
      <location filename="../../Command.cpp" line="248"/>
      <source>Create a local coordinate system</source>
      <translation>ローカル座標系を作成</translation>
    </message>
    <message>
      <location filename="../../Command.cpp" line="249"/>
      <source>Create a new local coordinate system</source>
      <translation>新しいローカル座標系を作成</translation>
    </message>
  </context>
  <context>
    <name>CmdPartDesignChamfer</name>
    <message>
      <location filename="../../Command.cpp" line="1789"/>
      <source>PartDesign</source>
      <translation>パートデザイン</translation>
    </message>
    <message>
      <location filename="../../Command.cpp" line="1790"/>
      <source>Chamfer</source>
      <translation>面取り</translation>
    </message>
    <message>
      <location filename="../../Command.cpp" line="1791"/>
      <source>Chamfer the selected edges of a shape</source>
      <translation>形状の選択されたエッジを面取り</translation>
    </message>
  </context>
  <context>
    <name>CmdPartDesignClone</name>
    <message>
      <location filename="../../Command.cpp" line="429"/>
      <source>PartDesign</source>
      <translation>パートデザイン</translation>
    </message>
    <message>
      <location filename="../../Command.cpp" line="430"/>
      <source>Create a clone</source>
      <translation>クローンを作成</translation>
    </message>
    <message>
      <location filename="../../Command.cpp" line="431"/>
      <source>Create a parametric copy of a solid object as the base feature of a new body</source>
      <translation type="unfinished">Create a parametric copy of a solid object as the base feature of a new body</translation>
    </message>
  </context>
  <context>
    <name>CmdPartDesignDraft</name>
    <message>
      <location filename="../../Command.cpp" line="1818"/>
      <source>PartDesign</source>
      <translation>パートデザイン</translation>
    </message>
    <message>
      <location filename="../../Command.cpp" line="1819"/>
      <source>Draft</source>
      <translation>抜き勾配</translation>
    </message>
    <message>
      <location filename="../../Command.cpp" line="1820"/>
      <source>Make a draft on a face</source>
      <translation>面上に抜き勾配を作成</translation>
    </message>
  </context>
  <context>
    <name>CmdPartDesignDuplicateSelection</name>
    <message>
      <location filename="../../CommandBody.cpp" line="608"/>
      <source>PartDesign</source>
      <translation>パートデザイン</translation>
    </message>
    <message>
      <location filename="../../CommandBody.cpp" line="609"/>
      <source>Duplicate selected &amp;object</source>
      <translation>選択したオブジェクトを複製(&amp;O)</translation>
    </message>
    <message>
      <location filename="../../CommandBody.cpp" line="610"/>
      <source>Duplicates the selected object and adds it to the active body</source>
      <translation>選択したオブジェクトを複製し、アクティブなボディーに追加</translation>
    </message>
  </context>
  <context>
    <name>CmdPartDesignFillet</name>
    <message>
      <location filename="../../Command.cpp" line="1761"/>
      <source>PartDesign</source>
      <translation>パートデザイン</translation>
    </message>
    <message>
      <location filename="../../Command.cpp" line="1762"/>
      <source>Fillet</source>
      <translation>フィレット</translation>
    </message>
    <message>
      <location filename="../../Command.cpp" line="1763"/>
      <source>Make a fillet on an edge, face or body</source>
      <translation>面や立体のエッジにフィレットを作成</translation>
    </message>
  </context>
  <context>
    <name>CmdPartDesignGroove</name>
    <message>
      <location filename="../../Command.cpp" line="1251"/>
      <source>PartDesign</source>
      <translation>パートデザイン</translation>
    </message>
    <message>
      <location filename="../../Command.cpp" line="1252"/>
      <source>Groove</source>
      <translation>グルーブ</translation>
    </message>
    <message>
      <location filename="../../Command.cpp" line="1253"/>
      <source>Groove a selected sketch</source>
      <translation>選択したスケッチに溝を作成</translation>
    </message>
  </context>
  <context>
    <name>CmdPartDesignHole</name>
    <message>
      <location filename="../../Command.cpp" line="1151"/>
      <source>PartDesign</source>
      <translation>パートデザイン</translation>
    </message>
    <message>
      <location filename="../../Command.cpp" line="1152"/>
      <source>Hole</source>
      <translation>ホール</translation>
    </message>
    <message>
      <location filename="../../Command.cpp" line="1153"/>
      <source>Create a hole with the selected sketch</source>
      <translation>選択されたスケッチでホールを作成</translation>
    </message>
  </context>
  <context>
    <name>CmdPartDesignLine</name>
    <message>
      <location filename="../../Command.cpp" line="191"/>
      <source>PartDesign</source>
      <translation>パートデザイン</translation>
    </message>
    <message>
      <location filename="../../Command.cpp" line="192"/>
      <source>Create a datum line</source>
      <translation>データム線を作成</translation>
    </message>
    <message>
      <location filename="../../Command.cpp" line="193"/>
      <source>Create a new datum line</source>
      <translation>新しいデータム線を作成</translation>
    </message>
  </context>
  <context>
    <name>CmdPartDesignLinearPattern</name>
    <message>
      <location filename="../../Command.cpp" line="2054"/>
      <source>PartDesign</source>
      <translation>パートデザイン</translation>
    </message>
    <message>
      <location filename="../../Command.cpp" line="2055"/>
      <source>LinearPattern</source>
      <translation>直線状パターン</translation>
    </message>
    <message>
      <location filename="../../Command.cpp" line="2056"/>
      <source>Create a linear pattern feature</source>
      <translation>直線状のパターン形状を作成</translation>
    </message>
  </context>
  <context>
    <name>CmdPartDesignMigrate</name>
    <message>
      <location filename="../../CommandBody.cpp" line="314"/>
      <source>PartDesign</source>
      <translation>パートデザイン</translation>
    </message>
    <message>
      <location filename="../../CommandBody.cpp" line="315"/>
      <source>Migrate</source>
      <translation>移行</translation>
    </message>
    <message>
      <location filename="../../CommandBody.cpp" line="316"/>
      <source>Migrate document to the modern PartDesign workflow</source>
      <translation>新しいパートデザイン・ワークフローへドキュメントを移行</translation>
    </message>
  </context>
  <context>
    <name>CmdPartDesignMirrored</name>
    <message>
      <location filename="../../Command.cpp" line="2003"/>
      <source>PartDesign</source>
      <translation>パートデザイン</translation>
    </message>
    <message>
      <location filename="../../Command.cpp" line="2004"/>
      <source>Mirrored</source>
      <translation>鏡像</translation>
    </message>
    <message>
      <location filename="../../Command.cpp" line="2005"/>
      <source>Create a mirrored feature</source>
      <translation>鏡像を作成</translation>
    </message>
  </context>
  <context>
    <name>CmdPartDesignMoveFeature</name>
    <message>
      <location filename="../../CommandBody.cpp" line="668"/>
      <source>PartDesign</source>
      <translation>パートデザイン</translation>
    </message>
    <message>
      <location filename="../../CommandBody.cpp" line="669"/>
      <source>Move object to other body</source>
      <translation>オブジェクトを他のボディーへ移動</translation>
    </message>
    <message>
      <location filename="../../CommandBody.cpp" line="670"/>
      <source>Moves the selected object to another body</source>
      <translation>選択したオブジェクトを他のボディーへ移動</translation>
    </message>
  </context>
  <context>
    <name>CmdPartDesignMoveFeatureInTree</name>
    <message>
      <location filename="../../CommandBody.cpp" line="835"/>
      <source>PartDesign</source>
      <translation>パートデザイン</translation>
    </message>
    <message>
      <location filename="../../CommandBody.cpp" line="836"/>
      <source>Move object after other object</source>
      <translation>オブジェクトを他のオブジェクトの後へ移動</translation>
    </message>
    <message>
      <location filename="../../CommandBody.cpp" line="837"/>
      <source>Moves the selected object and insert it after another object</source>
      <translation>選択したオブジェクトを移動し、他のオブジェクトの後ろへ挿入</translation>
    </message>
  </context>
  <context>
    <name>CmdPartDesignMoveTip</name>
    <message>
      <location filename="../../CommandBody.cpp" line="529"/>
      <source>PartDesign</source>
      <translation>パートデザイン</translation>
    </message>
    <message>
      <location filename="../../CommandBody.cpp" line="530"/>
      <source>Set tip</source>
      <translation>先端を設定</translation>
    </message>
    <message>
      <location filename="../../CommandBody.cpp" line="531"/>
      <source>Move the tip of the body</source>
      <translation>ボディーの先端を移動</translation>
    </message>
  </context>
  <context>
    <name>CmdPartDesignMultiTransform</name>
    <message>
      <location filename="../../Command.cpp" line="2204"/>
      <source>PartDesign</source>
      <translation>パートデザイン</translation>
    </message>
    <message>
      <location filename="../../Command.cpp" line="2205"/>
      <source>Create MultiTransform</source>
      <translation>マルチ変換を作成</translation>
    </message>
    <message>
      <location filename="../../Command.cpp" line="2206"/>
      <source>Create a multitransform feature</source>
      <translation>マルチ変換による形状を作成</translation>
    </message>
  </context>
  <context>
    <name>CmdPartDesignNewSketch</name>
    <message>
      <location filename="../../Command.cpp" line="503"/>
      <source>PartDesign</source>
      <translation>パートデザイン</translation>
    </message>
    <message>
      <location filename="../../Command.cpp" line="504"/>
      <source>Create sketch</source>
      <translation>スケッチを作成</translation>
    </message>
    <message>
      <location filename="../../Command.cpp" line="505"/>
      <source>Create a new sketch</source>
      <translation>新規スケッチを作成</translation>
    </message>
  </context>
  <context>
    <name>CmdPartDesignPad</name>
    <message>
      <location filename="../../Command.cpp" line="1093"/>
      <source>PartDesign</source>
      <translation>パートデザイン</translation>
    </message>
    <message>
      <location filename="../../Command.cpp" line="1094"/>
      <source>Pad</source>
      <translation>パッド</translation>
    </message>
    <message>
      <location filename="../../Command.cpp" line="1095"/>
      <source>Pad a selected sketch</source>
      <translation>選択されたスケッチを押し出し</translation>
    </message>
  </context>
  <context>
    <name>CmdPartDesignPlane</name>
    <message>
      <location filename="../../Command.cpp" line="163"/>
      <source>PartDesign</source>
      <translation>パートデザイン</translation>
    </message>
    <message>
      <location filename="../../Command.cpp" line="164"/>
      <source>Create a datum plane</source>
      <translation>データム平面を作成</translation>
    </message>
    <message>
      <location filename="../../Command.cpp" line="165"/>
      <source>Create a new datum plane</source>
      <translation>新しいデータム平面を作成</translation>
    </message>
  </context>
  <context>
    <name>CmdPartDesignPocket</name>
    <message>
      <location filename="../../Command.cpp" line="1122"/>
      <source>PartDesign</source>
      <translation>パートデザイン</translation>
    </message>
    <message>
      <location filename="../../Command.cpp" line="1123"/>
      <source>Pocket</source>
      <translation>ポケット</translation>
    </message>
    <message>
      <location filename="../../Command.cpp" line="1124"/>
      <source>Create a pocket with the selected sketch</source>
      <translation>選択されたスケッチでポケットを作成</translation>
    </message>
  </context>
  <context>
    <name>CmdPartDesignPoint</name>
    <message>
      <location filename="../../Command.cpp" line="219"/>
      <source>PartDesign</source>
      <translation>パートデザイン</translation>
    </message>
    <message>
      <location filename="../../Command.cpp" line="220"/>
      <source>Create a datum point</source>
      <translation>データム点を作成</translation>
    </message>
    <message>
      <location filename="../../Command.cpp" line="221"/>
      <source>Create a new datum point</source>
      <translation>新しいデータム点を作成</translation>
    </message>
  </context>
  <context>
    <name>CmdPartDesignPolarPattern</name>
    <message>
      <location filename="../../Command.cpp" line="2107"/>
      <source>PartDesign</source>
      <translation>パートデザイン</translation>
    </message>
    <message>
      <location filename="../../Command.cpp" line="2108"/>
      <source>PolarPattern</source>
      <translation>円状パターン</translation>
    </message>
    <message>
      <location filename="../../Command.cpp" line="2109"/>
      <source>Create a polar pattern feature</source>
      <translation>円状のパターン形状を作成</translation>
    </message>
  </context>
  <context>
    <name>CmdPartDesignRevolution</name>
    <message>
      <location filename="../../Command.cpp" line="1195"/>
      <source>PartDesign</source>
      <translation>パートデザイン</translation>
    </message>
    <message>
      <location filename="../../Command.cpp" line="1196"/>
      <source>Revolution</source>
      <translation>レボリューション</translation>
    </message>
    <message>
      <location filename="../../Command.cpp" line="1197"/>
      <source>Revolve a selected sketch</source>
      <translation>選択されたスケッチを回転押し出し</translation>
    </message>
  </context>
  <context>
    <name>CmdPartDesignScaled</name>
    <message>
      <location filename="../../Command.cpp" line="2162"/>
      <source>PartDesign</source>
      <translation>パートデザイン</translation>
    </message>
    <message>
      <location filename="../../Command.cpp" line="2163"/>
      <source>Scaled</source>
      <translation>拡大縮小</translation>
    </message>
    <message>
      <location filename="../../Command.cpp" line="2164"/>
      <source>Create a scaled feature</source>
      <translation>拡大縮小された形状を作成</translation>
    </message>
  </context>
  <context>
    <name>CmdPartDesignShapeBinder</name>
    <message>
      <location filename="../../Command.cpp" line="279"/>
      <source>PartDesign</source>
      <translation>パートデザイン</translation>
    </message>
    <message>
      <location filename="../../Command.cpp" line="280"/>
      <source>Create a shape binder</source>
      <translation>シェイプバインダーを作成</translation>
    </message>
    <message>
      <location filename="../../Command.cpp" line="281"/>
      <source>Create a new shape binder</source>
      <translation>新しいシェイプバインダーを作成</translation>
    </message>
  </context>
  <context>
    <name>CmdPartDesignSubShapeBinder</name>
    <message>
      <location filename="../../Command.cpp" line="345"/>
      <source>PartDesign</source>
      <translation>パートデザイン</translation>
    </message>
    <message>
      <location filename="../../Command.cpp" line="346"/>
      <source>Create a sub-object(s) shape binder</source>
      <translation>サブオブジェクトのシェイプバインダーを作成</translation>
    </message>
    <message>
      <location filename="../../Command.cpp" line="347"/>
      <source>Create a reference to geometry from one or more objects, allowing it to be used inside or outside a PartDesign Body. It tracks relative placements, supports multiple geometry types (solids, faces, edges, vertices), and can work with objects in the same or external documents.</source>
      <translation type="unfinished">Create a reference to geometry from one or more objects, allowing it to be used inside or outside a PartDesign Body. It tracks relative placements, supports multiple geometry types (solids, faces, edges, vertices), and can work with objects in the same or external documents.</translation>
    </message>
  </context>
  <context>
    <name>CmdPartDesignSubtractiveHelix</name>
    <message>
      <location filename="../../Command.cpp" line="1580"/>
      <source>PartDesign</source>
      <translation>パートデザイン</translation>
    </message>
    <message>
      <location filename="../../Command.cpp" line="1581"/>
      <source>Subtractive helix</source>
      <translation>減算らせん</translation>
    </message>
    <message>
      <location filename="../../Command.cpp" line="1582"/>
      <source>Sweep a selected sketch along a helix and remove it from the body</source>
      <translation>らせん状に沿って選択したスケッチをスイープしてボディーから削除します</translation>
    </message>
  </context>
  <context>
    <name>CmdPartDesignSubtractiveLoft</name>
    <message>
      <location filename="../../Command.cpp" line="1459"/>
      <source>PartDesign</source>
      <translation>パートデザイン</translation>
    </message>
    <message>
      <location filename="../../Command.cpp" line="1460"/>
      <source>Subtractive loft</source>
      <translation>減算ロフト</translation>
    </message>
    <message>
      <location filename="../../Command.cpp" line="1461"/>
      <source>Loft a selected profile through other profile sections and remove it from the body</source>
      <translation>選択されたプロファイルを別のプロファイル断面を通過するようにロフトし、さらにボディーから除去</translation>
    </message>
  </context>
  <context>
    <name>CmdPartDesignSubtractivePipe</name>
    <message>
      <location filename="../../Command.cpp" line="1363"/>
      <source>PartDesign</source>
      <translation>パートデザイン</translation>
    </message>
    <message>
      <location filename="../../Command.cpp" line="1364"/>
      <source>Subtractive pipe</source>
      <translation>減算パイプ</translation>
    </message>
    <message>
      <location filename="../../Command.cpp" line="1365"/>
      <source>Sweep a selected sketch along a path or to other profiles and remove it from the body</source>
      <translation>パスまたは他のプロファイルに沿って選択したスケッチをスイープした後、ボディーから削除</translation>
    </message>
  </context>
  <context>
    <name>CmdPartDesignThickness</name>
    <message>
      <location filename="../../Command.cpp" line="1886"/>
      <source>PartDesign</source>
      <translation>パートデザイン</translation>
    </message>
    <message>
      <location filename="../../Command.cpp" line="1887"/>
      <source>Thickness</source>
      <translation>厚み</translation>
    </message>
    <message>
      <location filename="../../Command.cpp" line="1888"/>
      <source>Make a thick solid</source>
      <translation>厚みのあるソリッドを作成</translation>
    </message>
  </context>
  <context>
    <name>CmdPrimtiveCompAdditive</name>
    <message>
      <location filename="../../CommandPrimitive.cpp" line="68"/>
      <source>PartDesign</source>
      <translation>パートデザイン</translation>
    </message>
    <message>
      <location filename="../../CommandPrimitive.cpp" line="69"/>
      <location filename="../../CommandPrimitive.cpp" line="70"/>
      <source>Create an additive primitive</source>
      <translation>加算プリミティブを作成</translation>
    </message>
    <message>
      <location filename="../../CommandPrimitive.cpp" line="197"/>
      <source>Additive Box</source>
      <translation>加算直方体</translation>
    </message>
    <message>
      <location filename="../../CommandPrimitive.cpp" line="201"/>
      <source>Additive Cylinder</source>
      <translation>加算円柱</translation>
    </message>
    <message>
      <location filename="../../CommandPrimitive.cpp" line="205"/>
      <source>Additive Sphere</source>
      <translation>加算球</translation>
    </message>
    <message>
      <location filename="../../CommandPrimitive.cpp" line="209"/>
      <source>Additive Cone</source>
      <translation>加算円錐</translation>
    </message>
    <message>
      <location filename="../../CommandPrimitive.cpp" line="213"/>
      <source>Additive Ellipsoid</source>
      <translation>加算楕円体</translation>
    </message>
    <message>
      <location filename="../../CommandPrimitive.cpp" line="217"/>
      <source>Additive Torus</source>
      <translation>加算トーラス</translation>
    </message>
    <message>
      <location filename="../../CommandPrimitive.cpp" line="221"/>
      <source>Additive Prism</source>
      <translation>加算角柱</translation>
    </message>
    <message>
      <location filename="../../CommandPrimitive.cpp" line="225"/>
      <source>Additive Wedge</source>
      <translation>加算ウェッジ</translation>
    </message>
  </context>
  <context>
    <name>CmdPrimtiveCompSubtractive</name>
    <message>
      <location filename="../../CommandPrimitive.cpp" line="241"/>
      <source>PartDesign</source>
      <translation>パートデザイン</translation>
    </message>
    <message>
      <location filename="../../CommandPrimitive.cpp" line="242"/>
      <location filename="../../CommandPrimitive.cpp" line="243"/>
      <source>Create a subtractive primitive</source>
      <translation>減算プリミティブを作成</translation>
    </message>
    <message>
      <location filename="../../CommandPrimitive.cpp" line="349"/>
      <source>Subtractive Box</source>
      <translation>減算直方体</translation>
    </message>
    <message>
      <location filename="../../CommandPrimitive.cpp" line="353"/>
      <source>Subtractive Cylinder</source>
      <translation>減算円柱</translation>
    </message>
    <message>
      <location filename="../../CommandPrimitive.cpp" line="357"/>
      <source>Subtractive Sphere</source>
      <translation>減算球</translation>
    </message>
    <message>
      <location filename="../../CommandPrimitive.cpp" line="361"/>
      <source>Subtractive Cone</source>
      <translation>減算円錐</translation>
    </message>
    <message>
      <location filename="../../CommandPrimitive.cpp" line="365"/>
      <source>Subtractive Ellipsoid</source>
      <translation>減算楕円体</translation>
    </message>
    <message>
      <location filename="../../CommandPrimitive.cpp" line="369"/>
      <source>Subtractive Torus</source>
      <translation>減算トーラス</translation>
    </message>
    <message>
      <location filename="../../CommandPrimitive.cpp" line="373"/>
      <source>Subtractive Prism</source>
      <translation>減算角柱</translation>
    </message>
    <message>
      <location filename="../../CommandPrimitive.cpp" line="377"/>
      <source>Subtractive Wedge</source>
      <translation>減算ウェッジ</translation>
    </message>
  </context>
  <context>
    <name>Command</name>
    <message>
      <location filename="../../Command.cpp" line="300"/>
      <source>Edit ShapeBinder</source>
      <translation>シェイプバインダーを編集</translation>
    </message>
    <message>
      <location filename="../../Command.cpp" line="309"/>
      <source>Create ShapeBinder</source>
      <translation>シェイプバインダーを作成</translation>
    </message>
    <message>
      <location filename="../../Command.cpp" line="392"/>
      <source>Create SubShapeBinder</source>
      <translation>サブシェイプバインダーを作成</translation>
    </message>
    <message>
      <location filename="../../Command.cpp" line="447"/>
      <source>Create Clone</source>
      <translation>クローンを作成</translation>
    </message>
    <message>
      <location filename="../../SketchWorkflow.cpp" line="299"/>
      <location filename="../../Command.cpp" line="993"/>
      <source>Make copy</source>
      <translation>コピーの作成</translation>
    </message>
    <message>
      <location filename="../../SketchWorkflow.cpp" line="249"/>
      <source>Create a Sketch on Face</source>
      <translation>面上にスケッチを作成</translation>
    </message>
    <message>
      <location filename="../../SketchWorkflow.cpp" line="495"/>
      <location filename="../../SketchWorkflow.cpp" line="701"/>
      <source>Create a new Sketch</source>
      <translation>新規スケッチを作成</translation>
    </message>
    <message>
      <location filename="../../Command.cpp" line="2249"/>
      <source>Convert to MultiTransform feature</source>
      <translation>マルチトランスフォームフィーチャに変換</translation>
    </message>
    <message>
      <location filename="../../Command.cpp" line="2337"/>
      <source>Create Boolean</source>
      <translation>Bool変数の作成</translation>
    </message>
    <message>
      <location filename="../../DlgActiveBody.cpp" line="102"/>
      <location filename="../../CommandBody.cpp" line="188"/>
      <source>Add a Body</source>
      <translation>ボディーを追加</translation>
    </message>
    <message>
      <location filename="../../CommandBody.cpp" line="432"/>
      <source>Migrate legacy Part Design features to Bodies</source>
      <translation>過去のパートデザインのフィーチャーをボディーに移行</translation>
    </message>
    <message>
      <location filename="../../CommandBody.cpp" line="577"/>
      <source>Move tip to selected feature</source>
      <translation>選択したフィーチャーに先端を移動</translation>
    </message>
    <message>
      <location filename="../../CommandBody.cpp" line="622"/>
      <source>Duplicate a PartDesign object</source>
      <translation>PartDesign オブジェクトを複製</translation>
    </message>
    <message>
      <location filename="../../CommandBody.cpp" line="749"/>
      <source>Move an object</source>
      <translation>オブジェクトを移動</translation>
    </message>
    <message>
      <location filename="../../CommandBody.cpp" line="900"/>
      <source>Move an object inside tree</source>
      <translation>ツリー内のオブジェクトを移動</translation>
    </message>
    <message>
      <location filename="../../TaskMultiTransformParameters.cpp" line="267"/>
      <source>Mirrored</source>
      <translation>鏡像</translation>
    </message>
    <message>
      <location filename="../../TaskMultiTransformParameters.cpp" line="304"/>
      <source>Make LinearPattern</source>
      <translation>直線状パターンを作成</translation>
    </message>
    <message>
      <location filename="../../TaskMultiTransformParameters.cpp" line="348"/>
      <source>PolarPattern</source>
      <translation>円状パターン</translation>
    </message>
    <message>
      <location filename="../../TaskMultiTransformParameters.cpp" line="385"/>
      <source>Scaled</source>
      <translation>拡大縮小</translation>
    </message>
  </context>
  <context>
    <name>FeaturePickDialog</name>
    <message>
      <location filename="../../FeaturePickDialog.cpp" line="42"/>
      <source>Valid</source>
      <translation>有効</translation>
    </message>
    <message>
      <location filename="../../FeaturePickDialog.cpp" line="43"/>
      <source>Invalid shape</source>
      <translation>無効な形状です。</translation>
    </message>
    <message>
      <location filename="../../FeaturePickDialog.cpp" line="44"/>
      <source>No wire in sketch</source>
      <translation>スケッチ上にワイヤーがありません。</translation>
    </message>
    <message>
      <location filename="../../FeaturePickDialog.cpp" line="45"/>
      <source>Sketch already used by other feature</source>
      <translation>スケッチはすでに他の形状に使用されています。</translation>
    </message>
    <message>
      <location filename="../../FeaturePickDialog.cpp" line="46"/>
      <source>Sketch belongs to another Body feature</source>
      <translation>スケッチは他のボディーフィーチャーに属しています</translation>
    </message>
    <message>
      <location filename="../../FeaturePickDialog.cpp" line="47"/>
      <source>Base plane</source>
      <translation>ベース平面</translation>
    </message>
    <message>
      <location filename="../../FeaturePickDialog.cpp" line="48"/>
      <source>Feature is located after the Tip feature</source>
      <translation>フィーチャーは先端のフィーチャーの後に位置しています。</translation>
    </message>
  </context>
  <context>
    <name>Gui::TaskView::TaskWatcherCommands</name>
    <message>
      <location filename="../../Workbench.cpp" line="54"/>
      <source>Face tools</source>
      <translation>表面ツール</translation>
    </message>
    <message>
      <location filename="../../Workbench.cpp" line="55"/>
      <source>Edge tools</source>
      <translation>エッジツール</translation>
    </message>
    <message>
      <location filename="../../Workbench.cpp" line="56"/>
      <source>Boolean tools</source>
      <translation>ブーリアン操作ツール</translation>
    </message>
    <message>
      <location filename="../../Workbench.cpp" line="57"/>
      <source>Helper tools</source>
      <translation>補助ツール</translation>
    </message>
    <message>
      <location filename="../../Workbench.cpp" line="58"/>
      <source>Modeling tools</source>
      <translation>モデリングツール</translation>
    </message>
    <message>
      <location filename="../../Workbench.cpp" line="59"/>
      <source>Create Geometry</source>
      <translation>ジオメトリを作成</translation>
    </message>
  </context>
  <context>
    <name>InvoluteGearParameter</name>
    <message>
      <location filename="../../../InvoluteGearFeature.ui" line="14"/>
      <source>Involute parameter</source>
      <translation>インボリュートパラメーター</translation>
    </message>
    <message>
      <location filename="../../../InvoluteGearFeature.ui" line="20"/>
      <source>Number of teeth:</source>
      <translation>歯数:</translation>
    </message>
    <message>
      <location filename="../../../InvoluteGearFeature.ui" line="40"/>
      <source>Module:</source>
      <translation>モジュール:</translation>
    </message>
    <message>
      <location filename="../../../InvoluteGearFeature.ui" line="84"/>
      <source>Pressure angle:</source>
      <translation>圧力角:</translation>
    </message>
    <message>
      <location filename="../../../InvoluteGearFeature.ui" line="125"/>
      <source>High precision:</source>
      <translation>高精度:</translation>
    </message>
    <message>
      <location filename="../../../InvoluteGearFeature.ui" line="139"/>
      <location filename="../../../InvoluteGearFeature.ui" line="166"/>
      <source>True</source>
      <translation>True</translation>
    </message>
    <message>
      <location filename="../../../InvoluteGearFeature.ui" line="144"/>
      <location filename="../../../InvoluteGearFeature.ui" line="171"/>
      <source>False</source>
      <translation>False</translation>
    </message>
    <message>
      <location filename="../../../InvoluteGearFeature.ui" line="152"/>
      <source>External gear:</source>
      <translation>外歯車:</translation>
    </message>
    <message>
      <location filename="../../../InvoluteGearFeature.ui" line="179"/>
      <source>Addendum Coefficient</source>
      <translation>歯先のたけ係数</translation>
    </message>
    <message>
      <location filename="../../../InvoluteGearFeature.ui" line="199"/>
      <source>Dedendum Coefficient</source>
      <translation>歯元のたけ係数</translation>
    </message>
    <message>
      <location filename="../../../InvoluteGearFeature.ui" line="219"/>
      <source>Root Fillet Coefficient</source>
      <translation>ルートフィレット係数</translation>
    </message>
    <message>
      <location filename="../../../InvoluteGearFeature.ui" line="239"/>
      <source>Profile Shift Coefficient</source>
      <translation>プロファイルシフト係数</translation>
    </message>
  </context>
  <context>
    <name>PartDesignGui::DlgActiveBody</name>
    <message>
      <location filename="../../DlgActiveBody.ui" line="14"/>
      <source>Active Body Required</source>
      <translation>アクティブなボディーが必要です。</translation>
    </message>
    <message>
      <location filename="../../DlgActiveBody.ui" line="20"/>
      <source>To create a new PartDesign object, there must be an active Body object in the document.

Please select a body from below, or create a new body.</source>
      <translation>新しいPartDesignオブジェクトを作成するには、ドキュメント内にアクティブなボディーオブジェクトが存在する必要があります。

以下からボディーを選択するか、新しいボディーを作成してください。</translation>
    </message>
    <message>
      <location filename="../../DlgActiveBody.ui" line="36"/>
      <source>Create new body</source>
      <translation>新しいボディーを作成</translation>
    </message>
    <message>
      <location filename="../../DlgActiveBody.cpp" line="55"/>
      <source>Please select</source>
      <translation>選択してください</translation>
    </message>
  </context>
  <context>
    <name>PartDesignGui::DlgPrimitives</name>
    <message>
      <location filename="../../TaskPrimitiveParameters.ui" line="14"/>
      <source>Geometric Primitives</source>
      <translation>幾何プリミティブ</translation>
    </message>
    <message>
      <location filename="../../TaskPrimitiveParameters.ui" line="62"/>
      <location filename="../../TaskPrimitiveParameters.ui" line="153"/>
      <source>Length:</source>
      <translation>長さ:</translation>
    </message>
    <message>
      <location filename="../../TaskPrimitiveParameters.ui" line="82"/>
      <location filename="../../TaskPrimitiveParameters.ui" line="173"/>
      <source>Width:</source>
      <translation>幅：</translation>
    </message>
    <message>
      <location filename="../../TaskPrimitiveParameters.ui" line="193"/>
      <location filename="../../TaskPrimitiveParameters.ui" line="287"/>
      <location filename="../../TaskPrimitiveParameters.ui" line="505"/>
      <location filename="../../TaskPrimitiveParameters.ui" line="1254"/>
      <location filename="../../TaskPrimitiveParameters.ui" line="1580"/>
      <source>Height:</source>
      <translation>高さ：</translation>
    </message>
    <message>
      <location filename="../../TaskPrimitiveParameters.ui" line="267"/>
      <location filename="../../TaskPrimitiveParameters.ui" line="625"/>
      <location filename="../../TaskPrimitiveParameters.ui" line="1600"/>
      <location filename="../../TaskPrimitiveParameters.ui" line="1749"/>
      <location filename="../../TaskPrimitiveParameters.ui" line="1805"/>
      <source>Radius:</source>
      <translation>半径:</translation>
    </message>
    <message>
      <location filename="../../TaskPrimitiveParameters.ui" line="307"/>
      <location filename="../../TaskPrimitiveParameters.ui" line="1274"/>
      <source>Angle in first direction:</source>
      <translation>最初の方向の角度:</translation>
    </message>
    <message>
      <location filename="../../TaskPrimitiveParameters.ui" line="314"/>
      <location filename="../../TaskPrimitiveParameters.ui" line="1281"/>
      <source>Angle in first direction</source>
      <translation>最初の方向の角度</translation>
    </message>
    <message>
      <location filename="../../TaskPrimitiveParameters.ui" line="333"/>
      <location filename="../../TaskPrimitiveParameters.ui" line="1300"/>
      <source>Angle in second direction:</source>
      <translation>2番目の方向の角度:</translation>
    </message>
    <message>
      <location filename="../../TaskPrimitiveParameters.ui" line="340"/>
      <location filename="../../TaskPrimitiveParameters.ui" line="1307"/>
      <source>Angle in second direction</source>
      <translation>2番目の方向の角度</translation>
    </message>
    <message>
      <location filename="../../TaskPrimitiveParameters.ui" line="391"/>
      <source>Rotation angle:</source>
      <translation>回転角度:</translation>
    </message>
    <message>
      <location filename="../../TaskPrimitiveParameters.ui" line="465"/>
      <location filename="../../TaskPrimitiveParameters.ui" line="797"/>
      <location filename="../../TaskPrimitiveParameters.ui" line="1016"/>
      <source>Radius 1:</source>
      <translation>半径 1:</translation>
    </message>
    <message>
      <location filename="../../TaskPrimitiveParameters.ui" line="485"/>
      <location filename="../../TaskPrimitiveParameters.ui" line="820"/>
      <location filename="../../TaskPrimitiveParameters.ui" line="1039"/>
      <source>Radius 2:</source>
      <translation>半径 2:</translation>
    </message>
    <message>
      <location filename="../../TaskPrimitiveParameters.ui" line="551"/>
      <location filename="../../TaskPrimitiveParameters.ui" line="1620"/>
      <source>Angle:</source>
      <translation>角度:</translation>
    </message>
    <message>
      <location filename="../../TaskPrimitiveParameters.ui" line="674"/>
      <location filename="../../TaskPrimitiveParameters.ui" line="896"/>
      <source>U parameter:</source>
      <translation>Uパラメーター:</translation>
    </message>
    <message>
      <location filename="../../TaskPrimitiveParameters.ui" line="694"/>
      <source>V parameters:</source>
      <translation>Vパラメーター:</translation>
    </message>
    <message>
      <location filename="../../TaskPrimitiveParameters.ui" line="804"/>
      <source>Radius in local z-direction</source>
      <translation>ローカルZ方向の半径</translation>
    </message>
    <message>
      <location filename="../../TaskPrimitiveParameters.ui" line="827"/>
      <source>Radius in local x-direction</source>
      <translation>ローカルX方向の半径</translation>
    </message>
    <message>
      <location filename="../../TaskPrimitiveParameters.ui" line="843"/>
      <source>Radius 3:</source>
      <translation>半径 3:</translation>
    </message>
    <message>
      <location filename="../../TaskPrimitiveParameters.ui" line="850"/>
      <source>Radius in local y-direction
If zero, it is equal to Radius2</source>
      <translation>ローカルY方向の半径
ゼロの場合はRadius2と等しい。</translation>
    </message>
    <message>
      <location filename="../../TaskPrimitiveParameters.ui" line="916"/>
      <location filename="../../TaskPrimitiveParameters.ui" line="1111"/>
      <source>V parameter:</source>
      <translation>Vパラメーター:</translation>
    </message>
    <message>
      <location filename="../../TaskPrimitiveParameters.ui" line="1023"/>
      <source>Radius in local xy-plane</source>
      <translation>ローカルxy平面における半径</translation>
    </message>
    <message>
      <location filename="../../TaskPrimitiveParameters.ui" line="1046"/>
      <source>Radius in local xz-plane</source>
      <translation>ローカルXZ平面における半径</translation>
    </message>
    <message>
      <location filename="../../TaskPrimitiveParameters.ui" line="1091"/>
      <source>U Parameter:</source>
      <translation>Uパラメーター:</translation>
    </message>
    <message>
      <location filename="../../TaskPrimitiveParameters.ui" line="1214"/>
      <location filename="../../TaskPrimitiveParameters.ui" line="2290"/>
      <source>Polygon:</source>
      <translation>角数:</translation>
    </message>
    <message>
      <location filename="../../TaskPrimitiveParameters.ui" line="1234"/>
      <location filename="../../TaskPrimitiveParameters.ui" line="2313"/>
      <source>Circumradius:</source>
      <translation>外接円の半径:</translation>
    </message>
    <message>
      <location filename="../../TaskPrimitiveParameters.ui" line="1353"/>
      <source>X min/max:</source>
      <translation>X の最小値/最大値:</translation>
    </message>
    <message>
      <location filename="../../TaskPrimitiveParameters.ui" line="1383"/>
      <source>Y min/max:</source>
      <translation>Y の最小値/最大値:</translation>
    </message>
    <message>
      <location filename="../../TaskPrimitiveParameters.ui" line="1413"/>
      <source>Z min/max:</source>
      <translation>Z の最小値/最大値:</translation>
    </message>
    <message>
      <location filename="../../TaskPrimitiveParameters.ui" line="1443"/>
      <source>X2 min/max:</source>
      <translation>X2 の最小値/最大値:</translation>
    </message>
    <message>
      <location filename="../../TaskPrimitiveParameters.ui" line="1476"/>
      <source>Z2 min/max:</source>
      <translation>Z2 の最小値/最大値:</translation>
    </message>
    <message>
      <location filename="../../TaskPrimitiveParameters.ui" line="1560"/>
      <source>Pitch:</source>
      <translation>ピッチ：</translation>
    </message>
    <message>
      <location filename="../../TaskPrimitiveParameters.ui" line="1637"/>
      <source>Coordinate system:</source>
      <translation>座標系：</translation>
    </message>
    <message>
      <location filename="../../TaskPrimitiveParameters.ui" line="1645"/>
      <source>Right-handed</source>
      <translation>右手系</translation>
    </message>
    <message>
      <location filename="../../TaskPrimitiveParameters.ui" line="1650"/>
      <source>Left-handed</source>
      <translation>左手系</translation>
    </message>
    <message>
      <location filename="../../TaskPrimitiveParameters.ui" line="1709"/>
      <source>Growth:</source>
      <translation>渦の線間：</translation>
    </message>
    <message>
      <location filename="../../TaskPrimitiveParameters.ui" line="1729"/>
      <source>Number of rotations:</source>
      <translation>渦の回数：</translation>
    </message>
    <message>
      <location filename="../../TaskPrimitiveParameters.ui" line="1825"/>
      <location filename="../../TaskPrimitiveParameters.ui" line="1947"/>
      <source>Angle 1:</source>
      <translation>角度1:</translation>
    </message>
    <message>
      <location filename="../../TaskPrimitiveParameters.ui" line="1842"/>
      <location filename="../../TaskPrimitiveParameters.ui" line="1964"/>
      <source>Angle 2:</source>
      <translation>角度2:</translation>
    </message>
    <message>
      <location filename="../../TaskPrimitiveParameters.ui" line="1879"/>
      <source>From three points</source>
      <translation>3点から</translation>
    </message>
    <message>
      <location filename="../../TaskPrimitiveParameters.ui" line="1907"/>
      <source>Major radius:</source>
      <translation>主半径</translation>
    </message>
    <message>
      <location filename="../../TaskPrimitiveParameters.ui" line="1927"/>
      <source>Minor radius:</source>
      <translation>副半径</translation>
    </message>
    <message>
      <location filename="../../TaskPrimitiveParameters.ui" line="2005"/>
      <location filename="../../TaskPrimitiveParameters.ui" line="2093"/>
      <location filename="../../TaskPrimitiveParameters.ui" line="2170"/>
      <source>X:</source>
      <translation>X:</translation>
    </message>
    <message>
      <location filename="../../TaskPrimitiveParameters.ui" line="2025"/>
      <location filename="../../TaskPrimitiveParameters.ui" line="2113"/>
      <location filename="../../TaskPrimitiveParameters.ui" line="2193"/>
      <source>Y:</source>
      <translation>Y:</translation>
    </message>
    <message>
      <location filename="../../TaskPrimitiveParameters.ui" line="2045"/>
      <location filename="../../TaskPrimitiveParameters.ui" line="2133"/>
      <location filename="../../TaskPrimitiveParameters.ui" line="2216"/>
      <source>Z:</source>
      <translation>Z:</translation>
    </message>
    <message>
      <location filename="../../TaskPrimitiveParameters.ui" line="2086"/>
      <source>Start point</source>
      <translation>始点</translation>
    </message>
    <message>
      <location filename="../../TaskPrimitiveParameters.ui" line="2160"/>
      <source>End point</source>
      <translation>終点</translation>
    </message>
  </context>
  <context>
    <name>PartDesignGui::DlgReference</name>
    <message>
      <location filename="../../DlgReference.ui" line="14"/>
      <source>Reference</source>
      <translation>参照</translation>
    </message>
    <message>
      <location filename="../../DlgReference.ui" line="20"/>
      <source>You selected geometries which are not part of the active body. Please define how to handle those selections. If you do not want those references, cancel the command.</source>
      <translation>アクティブなボディの一部ではないジオメトリを選択しました。 これらの選択をどのように処理するかを定義してください。これらの参照を必要としない場合は、コマンドをキャンセルします。</translation>
    </message>
    <message>
      <location filename="../../DlgReference.ui" line="42"/>
      <source>Make independent copy (recommended)</source>
      <translation>独立したコピーを作成（推奨）</translation>
    </message>
    <message>
      <location filename="../../DlgReference.ui" line="52"/>
      <source>Make dependent copy</source>
      <translation>依存コピーを作成</translation>
    </message>
    <message>
      <location filename="../../DlgReference.ui" line="59"/>
      <source>Create cross-reference</source>
      <translation>相互参照を作成</translation>
    </message>
  </context>
  <context>
    <name>PartDesignGui::NoDependentsSelection</name>
    <message>
      <location filename="../../ReferenceSelection.cpp" line="271"/>
      <source>Selecting this will cause circular dependency.</source>
      <translation>これを選択すると依存関係の循環が発生します。</translation>
    </message>
  </context>
  <context>
    <name>PartDesignGui::TaskBooleanParameters</name>
    <message>
      <location filename="../../TaskBooleanParameters.ui" line="22"/>
      <source>Add body</source>
      <translation>ボディーを追加</translation>
    </message>
    <message>
      <location filename="../../TaskBooleanParameters.ui" line="32"/>
      <source>Remove body</source>
      <translation>ボディーを削除</translation>
    </message>
    <message>
      <location filename="../../TaskBooleanParameters.ui" line="48"/>
      <source>Fuse</source>
      <translation>結合</translation>
    </message>
    <message>
      <location filename="../../TaskBooleanParameters.ui" line="53"/>
      <source>Cut</source>
      <translation>切り取り</translation>
    </message>
    <message>
      <location filename="../../TaskBooleanParameters.ui" line="58"/>
      <source>Common</source>
      <translation>共通部分</translation>
    </message>
    <message>
      <location filename="../../TaskBooleanParameters.cpp" line="53"/>
      <source>Boolean parameters</source>
      <translation>ブーリアンパラメーター</translation>
    </message>
    <message>
      <location filename="../../TaskBooleanParameters.cpp" line="86"/>
      <source>Remove</source>
      <translation>削除</translation>
    </message>
  </context>
  <context>
    <name>PartDesignGui::TaskBoxPrimitives</name>
    <message>
      <location filename="../../TaskPrimitiveParameters.cpp" line="51"/>
      <source>Primitive parameters</source>
      <translation>プリミティブパラメーター</translation>
    </message>
    <message>
      <location filename="../../TaskPrimitiveParameters.cpp" line="917"/>
      <location filename="../../TaskPrimitiveParameters.cpp" line="923"/>
      <location filename="../../TaskPrimitiveParameters.cpp" line="929"/>
      <source>Invalid wedge parameters</source>
      <translation>無効なウェッジパラメーターです。</translation>
    </message>
    <message>
      <location filename="../../TaskPrimitiveParameters.cpp" line="918"/>
      <source>X min must not be equal to X max!</source>
      <translation>X minはX maxより小さい必要があります。</translation>
    </message>
    <message>
      <location filename="../../TaskPrimitiveParameters.cpp" line="924"/>
      <source>Y min must not be equal to Y max!</source>
      <translation>Y minはY maxより小さい必要があります。</translation>
    </message>
    <message>
      <location filename="../../TaskPrimitiveParameters.cpp" line="930"/>
      <source>Z min must not be equal to Z max!</source>
      <translation>Z minはZ maxは小さい必要があります。</translation>
    </message>
    <message>
      <location filename="../../TaskPrimitiveParameters.cpp" line="968"/>
      <source>Create primitive</source>
      <translation>プリミティブを作成</translation>
    </message>
  </context>
  <context>
    <name>PartDesignGui::TaskChamferParameters</name>
    <message>
      <location filename="../../TaskChamferParameters.ui" line="20"/>
      <source>Click button to enter selection mode,
click again to end selection</source>
      <translation>ボタンをクリックして選択モードに入ります。
もう一度クリックして選択モードを終了します。</translation>
    </message>
    <message>
      <location filename="../../TaskChamferParameters.ui" line="24"/>
      <source>Select</source>
      <translation>選択</translation>
    </message>
    <message>
      <location filename="../../TaskChamferParameters.ui" line="34"/>
      <source>- select an item to highlight it
- double-click on an item to see the chamfers</source>
      <translation>- 強調表示する項目を選択します
- 項目をダブルクリックして面取りを表示します</translation>
    </message>
    <message>
      <location filename="../../TaskChamferParameters.ui" line="49"/>
      <source>Type</source>
      <translation>タイプ</translation>
    </message>
    <message>
      <location filename="../../TaskChamferParameters.ui" line="57"/>
      <source>Equal distance</source>
      <translation>等距離</translation>
    </message>
    <message>
      <location filename="../../TaskChamferParameters.ui" line="62"/>
      <source>Two distances</source>
      <translation>2つの距離</translation>
    </message>
    <message>
      <location filename="../../TaskChamferParameters.ui" line="67"/>
      <source>Distance and angle</source>
      <translation>距離と角度</translation>
    </message>
    <message>
      <location filename="../../TaskChamferParameters.ui" line="80"/>
      <source>Flip direction</source>
      <translation>方向転換</translation>
    </message>
    <message>
      <location filename="../../TaskChamferParameters.ui" line="101"/>
      <source>Size</source>
      <translation>サイズ</translation>
    </message>
    <message>
      <location filename="../../TaskChamferParameters.ui" line="120"/>
      <source>Use All Edges</source>
      <translation>すべてのエッジを使用</translation>
    </message>
    <message>
      <location filename="../../TaskChamferParameters.ui" line="147"/>
      <source>Size 2</source>
      <translation>サイズ2</translation>
    </message>
    <message>
      <location filename="../../TaskChamferParameters.ui" line="180"/>
      <source>Angle</source>
      <translation>角度</translation>
    </message>
    <message>
      <location filename="../../TaskChamferParameters.cpp" line="327"/>
      <source>Empty chamfer created !
</source>
      <translation>空の面取りが作成されました!
</translation>
    </message>
  </context>
  <context>
    <name>PartDesignGui::TaskDlgBooleanParameters</name>
    <message>
      <location filename="../../TaskBooleanParameters.cpp" line="390"/>
      <source>Empty body list</source>
      <translation>ボディーのリストを空にする</translation>
    </message>
    <message>
      <location filename="../../TaskBooleanParameters.cpp" line="391"/>
      <source>The body list cannot be empty</source>
      <translation>このボディーのリストは空にできません</translation>
    </message>
    <message>
      <location filename="../../TaskBooleanParameters.cpp" line="405"/>
      <source>Boolean: Accept: Input error</source>
      <translation>ブーリアン: 許可: 入力エラー</translation>
    </message>
  </context>
  <context>
    <name>PartDesignGui::TaskDlgDatumParameters</name>
    <message>
      <location filename="../../TaskDatumParameters.cpp" line="101"/>
      <source>Incompatible reference set</source>
      <translation>互換性のない参照セットです。</translation>
    </message>
    <message>
      <location filename="../../TaskDatumParameters.cpp" line="102"/>
      <source>There is no attachment mode that fits the current set of references. If you choose to continue, the feature will remain where it is now, and will not be moved as the references change. Continue?</source>
      <translation>現在の参照セットに合うアタッチメントモードがありません。続行を選択した場合、フィーチャーは今のまま残り、参照変更による移動は行われません。続行しますか？</translation>
    </message>
  </context>
  <context>
    <name>PartDesignGui::TaskDlgFeatureParameters</name>
    <message>
      <location filename="../../TaskFeatureParameters.cpp" line="146"/>
      <source>Input error</source>
      <translation>入力エラー</translation>
    </message>
  </context>
  <context>
    <name>PartDesignGui::TaskDlgShapeBinder</name>
    <message>
      <location filename="../../TaskShapeBinder.cpp" line="410"/>
      <source>Input error</source>
      <translation>入力エラー</translation>
    </message>
  </context>
  <context>
    <name>PartDesignGui::TaskDraftParameters</name>
    <message>
      <location filename="../../TaskDraftParameters.ui" line="20"/>
      <source>Click button to enter selection mode,
click again to end selection</source>
      <translation>ボタンをクリックして選択モードに入ります。
もう一度クリックして選択モードを終了します。</translation>
    </message>
    <message>
      <location filename="../../TaskDraftParameters.ui" line="24"/>
      <source>Select</source>
      <translation>選択</translation>
    </message>
    <message>
      <location filename="../../TaskDraftParameters.ui" line="34"/>
      <source>- select an item to highlight it
- double-click on an item to see the drafts</source>
      <translation>- 強調表示する項目を選択します
- 項目をダブルクリックして下書きを表示します</translation>
    </message>
    <message>
      <location filename="../../TaskDraftParameters.ui" line="47"/>
      <source>Draft angle</source>
      <translation>抜き勾配の角度</translation>
    </message>
    <message>
      <location filename="../../TaskDraftParameters.ui" line="80"/>
      <source>Neutral plane</source>
      <translation>中立面</translation>
    </message>
    <message>
      <location filename="../../TaskDraftParameters.ui" line="97"/>
      <source>Pull direction</source>
      <translation>引き抜き方向</translation>
    </message>
    <message>
      <location filename="../../TaskDraftParameters.ui" line="112"/>
      <source>Reverse pull direction</source>
      <translation>引き抜き方向を反転</translation>
    </message>
    <message>
      <location filename="../../TaskDraftParameters.cpp" line="287"/>
      <source>Empty draft created !
</source>
      <translation>空の抜き勾配が作成されました!
</translation>
    </message>
  </context>
  <context>
    <name>PartDesignGui::TaskDressUpParameters</name>
    <message>
      <location filename="../../TaskDressUpParameters.cpp" line="84"/>
      <source>Preview</source>
      <translation>プレビュー</translation>
    </message>
    <message>
      <location filename="../../TaskDressUpParameters.cpp" line="90"/>
      <source>Select</source>
      <translation>選択</translation>
    </message>
    <message>
      <location filename="../../TaskDressUpParameters.cpp" line="294"/>
      <source>Add all edges</source>
      <translation>すべてのエッジを追加</translation>
    </message>
    <message>
      <location filename="../../TaskDressUpParameters.cpp" line="299"/>
      <source>Adds all edges to the list box (active only when in add selection mode).</source>
      <translation>リストボックスにすべてのエッジを追加 (追加選択モードでのみ有効)</translation>
    </message>
    <message>
      <location filename="../../TaskDressUpParameters.cpp" line="307"/>
      <source>Remove</source>
      <translation>削除</translation>
    </message>
  </context>
  <context>
    <name>PartDesignGui::TaskExtrudeParameters</name>
    <message>
      <location filename="../../TaskExtrudeParameters.cpp" line="1214"/>
      <source>No face selected</source>
      <translation>面が選択されていません</translation>
    </message>
    <message>
      <location filename="../../TaskExtrudeParameters.cpp" line="160"/>
      <location filename="../../TaskExtrudeParameters.cpp" line="1049"/>
      <source>Face</source>
      <translation>面</translation>
    </message>
    <message>
      <location filename="../../TaskExtrudeParameters.cpp" line="176"/>
      <source>Remove</source>
      <translation>削除</translation>
    </message>
    <message>
      <location filename="../../TaskExtrudeParameters.cpp" line="265"/>
      <source>Preview</source>
      <translation>プレビュー</translation>
    </message>
    <message>
      <location filename="../../TaskExtrudeParameters.cpp" line="269"/>
      <source>Select faces</source>
      <translation>面を選択</translation>
    </message>
    <message>
      <location filename="../../TaskExtrudeParameters.cpp" line="492"/>
      <source>No shape selected</source>
      <translation>シェイプが選択されていません</translation>
    </message>
    <message>
      <location filename="../../TaskExtrudeParameters.cpp" line="600"/>
      <source>Sketch normal</source>
      <translation>スケッチ法線</translation>
    </message>
    <message>
      <location filename="../../TaskExtrudeParameters.cpp" line="603"/>
      <source>Face normal</source>
      <translation>面の法線</translation>
    </message>
    <message>
      <location filename="../../TaskExtrudeParameters.cpp" line="607"/>
      <source>Select reference...</source>
      <translation>参照を選択...</translation>
    </message>
    <message>
      <location filename="../../TaskExtrudeParameters.cpp" line="611"/>
      <location filename="../../TaskExtrudeParameters.cpp" line="616"/>
      <source>Custom direction</source>
      <translation>カスタム方向</translation>
    </message>
    <message>
      <location filename="../../TaskExtrudeParameters.cpp" line="1001"/>
      <source>Click on a shape in the model</source>
      <translation>モデルのシェイプをクリック</translation>
    </message>
    <message>
      <location filename="../../TaskExtrudeParameters.cpp" line="1209"/>
      <source>Click on a face in the model</source>
      <translation>モデルの面をクリック</translation>
    </message>
  </context>
  <context>
    <name>PartDesignGui::TaskFeaturePick</name>
    <message>
      <location filename="../../TaskFeaturePick.ui" line="23"/>
      <source>Allow used features</source>
      <translation>使用されているフィーチャーを許可</translation>
    </message>
    <message>
      <location filename="../../TaskFeaturePick.ui" line="30"/>
      <source>Allow external features</source>
      <translation>外部フィーチャーを許可</translation>
    </message>
    <message>
      <location filename="../../TaskFeaturePick.ui" line="42"/>
      <source>From other bodies of the same part</source>
      <translation>同じパーツの他のボディーから</translation>
    </message>
    <message>
      <location filename="../../TaskFeaturePick.ui" line="49"/>
      <source>From different parts or free features</source>
      <translation>異なるパーツまたは自由なフィーチャーから</translation>
    </message>
    <message>
      <location filename="../../TaskFeaturePick.ui" line="66"/>
      <source>Make independent copy (recommended)</source>
      <translation>独立したコピーを作成（推奨）</translation>
    </message>
    <message>
      <location filename="../../TaskFeaturePick.ui" line="79"/>
      <source>Make dependent copy</source>
      <translation>依存コピーを作成</translation>
    </message>
    <message>
      <location filename="../../TaskFeaturePick.ui" line="89"/>
      <source>Create cross-reference</source>
      <translation>相互参照を作成</translation>
    </message>
    <message>
      <location filename="../../TaskFeaturePick.cpp" line="67"/>
      <source>Valid</source>
      <translation>有効</translation>
    </message>
    <message>
      <location filename="../../TaskFeaturePick.cpp" line="69"/>
      <source>Invalid shape</source>
      <translation>無効な形状です。</translation>
    </message>
    <message>
      <location filename="../../TaskFeaturePick.cpp" line="71"/>
      <source>No wire in sketch</source>
      <translation>スケッチ上にワイヤーがありません。</translation>
    </message>
    <message>
      <location filename="../../TaskFeaturePick.cpp" line="73"/>
      <source>Sketch already used by other feature</source>
      <translation>スケッチはすでに他の形状に使用されています。</translation>
    </message>
    <message>
      <location filename="../../TaskFeaturePick.cpp" line="75"/>
      <source>Belongs to another body</source>
      <translation>他のボディーに属しています。</translation>
    </message>
    <message>
      <location filename="../../TaskFeaturePick.cpp" line="77"/>
      <source>Belongs to another part</source>
      <translation>他のパーツに属しています。</translation>
    </message>
    <message>
      <location filename="../../TaskFeaturePick.cpp" line="79"/>
      <source>Doesn't belong to any body</source>
      <translation>どのボディーにも属していません。</translation>
    </message>
    <message>
      <location filename="../../TaskFeaturePick.cpp" line="81"/>
      <source>Base plane</source>
      <translation>ベース平面</translation>
    </message>
    <message>
      <location filename="../../TaskFeaturePick.cpp" line="83"/>
      <source>Feature is located after the tip feature</source>
      <translation>フィーチャーは先端のフィーチャーの後に位置しています。</translation>
    </message>
    <message>
      <location filename="../../TaskFeaturePick.cpp" line="93"/>
      <source>Select attachment</source>
      <translation>アタッチメントを選択</translation>
    </message>
  </context>
  <context>
    <name>PartDesignGui::TaskFilletParameters</name>
    <message>
      <location filename="../../TaskFilletParameters.ui" line="20"/>
      <source>Click button to enter selection mode,
click again to end selection</source>
      <translation>ボタンをクリックして選択モードに入ります。
もう一度クリックして選択モードを終了します。</translation>
    </message>
    <message>
      <location filename="../../TaskFilletParameters.ui" line="24"/>
      <source>Select</source>
      <translation>選択</translation>
    </message>
    <message>
      <location filename="../../TaskFilletParameters.ui" line="34"/>
      <source>- select an item to highlight it
- double-click on an item to see the fillets</source>
      <translation>- 強調表示する項目を選択します
- 項目をダブルクリックしてフィレットを表示します</translation>
    </message>
    <message>
      <location filename="../../TaskFilletParameters.ui" line="47"/>
      <source>Radius:</source>
      <translation>半径:</translation>
    </message>
    <message>
      <location filename="../../TaskFilletParameters.ui" line="63"/>
      <source>Use All Edges</source>
      <translation>すべてのエッジを使用</translation>
    </message>
    <message>
      <location filename="../../TaskFilletParameters.cpp" line="193"/>
      <source>Empty fillet created!</source>
      <translation>空のフィレットが作成されました!</translation>
    </message>
  </context>
  <context>
    <name>PartDesignGui::TaskHelixParameters</name>
    <message>
      <location filename="../../TaskHelixParameters.ui" line="22"/>
      <source>Status:</source>
      <translation>ステータス</translation>
    </message>
    <message>
      <location filename="../../TaskHelixParameters.ui" line="29"/>
      <source>Valid</source>
      <translation>有効</translation>
    </message>
    <message>
      <location filename="../../TaskHelixParameters.ui" line="40"/>
      <source>Axis:</source>
      <translation>軸:</translation>
    </message>
    <message>
      <location filename="../../TaskHelixParameters.ui" line="48"/>
      <location filename="../../TaskHelixParameters.cpp" line="237"/>
      <source>Base X axis</source>
      <translation>ベースX軸</translation>
    </message>
    <message>
      <location filename="../../TaskHelixParameters.ui" line="53"/>
      <location filename="../../TaskHelixParameters.cpp" line="238"/>
      <source>Base Y axis</source>
      <translation>ベースY軸</translation>
    </message>
    <message>
      <location filename="../../TaskHelixParameters.ui" line="58"/>
      <location filename="../../TaskHelixParameters.cpp" line="239"/>
      <source>Base Z axis</source>
      <translation>ベースZ軸</translation>
    </message>
    <message>
      <location filename="../../TaskHelixParameters.ui" line="63"/>
      <location filename="../../TaskHelixParameters.cpp" line="221"/>
      <source>Horizontal sketch axis</source>
      <translation>水平スケッチ軸</translation>
    </message>
    <message>
      <location filename="../../TaskHelixParameters.ui" line="68"/>
      <location filename="../../TaskHelixParameters.cpp" line="220"/>
      <source>Vertical sketch axis</source>
      <translation>垂直スケッチ軸</translation>
    </message>
    <message>
      <location filename="../../TaskHelixParameters.ui" line="73"/>
      <location filename="../../TaskHelixParameters.cpp" line="219"/>
      <source>Normal sketch axis</source>
      <translation>通常のスケッチ軸</translation>
    </message>
    <message>
      <location filename="../../TaskHelixParameters.ui" line="78"/>
      <location filename="../../TaskHelixParameters.cpp" line="204"/>
      <source>Select reference...</source>
      <translation>参照を選択...</translation>
    </message>
    <message>
      <location filename="../../TaskHelixParameters.ui" line="90"/>
      <source>Mode:</source>
      <translation>モード:</translation>
    </message>
    <message>
      <location filename="../../TaskHelixParameters.ui" line="98"/>
      <source>Pitch-Height-Angle</source>
      <translation>ピッチ-高さ-角度</translation>
    </message>
    <message>
      <location filename="../../TaskHelixParameters.ui" line="103"/>
      <source>Pitch-Turns-Angle</source>
      <translation>ピッチ-ターン-角度</translation>
    </message>
    <message>
      <location filename="../../TaskHelixParameters.ui" line="108"/>
      <source>Height-Turns-Angle</source>
      <translation>高さ-ターン-角度</translation>
    </message>
    <message>
      <location filename="../../TaskHelixParameters.ui" line="113"/>
      <source>Height-Turns-Growth</source>
      <translation>高さ-ターン-伸び</translation>
    </message>
    <message>
      <location filename="../../TaskHelixParameters.ui" line="125"/>
      <source>Pitch:</source>
      <translation>ピッチ：</translation>
    </message>
    <message>
      <location filename="../../TaskHelixParameters.ui" line="152"/>
      <source>Height:</source>
      <translation>高さ：</translation>
    </message>
    <message>
      <location filename="../../TaskHelixParameters.ui" line="179"/>
      <source>Turns:</source>
      <translation>ターン数：</translation>
    </message>
    <message>
      <location filename="../../TaskHelixParameters.ui" line="203"/>
      <source>Cone angle:</source>
      <translation>コーンの角度:</translation>
    </message>
    <message>
      <location filename="../../TaskHelixParameters.ui" line="233"/>
      <source>Radial growth:</source>
      <translation>半径方向の増加率:</translation>
    </message>
    <message>
      <location filename="../../TaskHelixParameters.ui" line="255"/>
      <source>Left handed</source>
      <translation>左手系</translation>
    </message>
    <message>
      <location filename="../../TaskHelixParameters.ui" line="265"/>
      <source>Reversed</source>
      <translation>逆方向</translation>
    </message>
    <message>
      <location filename="../../TaskHelixParameters.ui" line="272"/>
      <source>Remove outside of profile</source>
      <translation>プロファイルの外側を削除</translation>
    </message>
    <message>
      <location filename="../../TaskHelixParameters.ui" line="289"/>
      <source>Update view</source>
      <translation>ビューを更新</translation>
    </message>
    <message>
      <location filename="../../TaskHelixParameters.cpp" line="56"/>
      <source>Helix parameters</source>
      <translation>らせんパラメーター</translation>
    </message>
    <message>
      <location filename="../../TaskHelixParameters.cpp" line="223"/>
      <source>Construction line %1</source>
      <translation>補助線 %1</translation>
    </message>
    <message>
      <location filename="../../TaskHelixParameters.cpp" line="289"/>
      <source>Warning: helix might be self intersecting</source>
      <translation>警告: らせんが自己交差している可能性があります。</translation>
    </message>
    <message>
      <location filename="../../TaskHelixParameters.cpp" line="294"/>
      <source>Error: helix touches itself</source>
      <translation>エラー: らせんが自身に接触しています。</translation>
    </message>
    <message>
      <location filename="../../TaskHelixParameters.cpp" line="343"/>
      <source>Error: unsupported mode</source>
      <translation>エラー: サポートされていないモードです。</translation>
    </message>
  </context>
  <context>
    <name>PartDesignGui::TaskHoleParameters</name>
    <message>
      <location filename="../../TaskHoleParameters.cpp" line="47"/>
      <source>Counterbore</source>
      <translation>カウンターボア</translation>
    </message>
    <message>
      <location filename="../../TaskHoleParameters.cpp" line="48"/>
      <source>Countersink</source>
      <translation>皿穴</translation>
    </message>
    <message>
      <location filename="../../TaskHoleParameters.cpp" line="49"/>
      <source>Counterdrill</source>
      <translation>座ぐり</translation>
    </message>
    <message>
      <location filename="../../TaskHoleParameters.cpp" line="53"/>
      <source>Hole parameters</source>
      <translation>ホールパラメーター</translation>
    </message>
    <message>
      <location filename="../../TaskHoleParameters.cpp" line="63"/>
      <source>None</source>
      <translation>なし</translation>
    </message>
    <message>
      <location filename="../../TaskHoleParameters.cpp" line="64"/>
      <source>ISO metric regular</source>
      <translation type="unfinished">ISO metric regular</translation>
    </message>
    <message>
      <location filename="../../TaskHoleParameters.cpp" line="65"/>
      <source>ISO metric fine</source>
      <translation type="unfinished">ISO metric fine</translation>
    </message>
    <message>
      <location filename="../../TaskHoleParameters.cpp" line="66"/>
      <source>UTS coarse</source>
      <translation type="unfinished">UTS coarse</translation>
    </message>
    <message>
      <location filename="../../TaskHoleParameters.cpp" line="67"/>
      <source>UTS fine</source>
      <translation type="unfinished">UTS fine</translation>
    </message>
    <message>
      <location filename="../../TaskHoleParameters.cpp" line="68"/>
      <source>UTS extra fine</source>
      <translation type="unfinished">UTS extra fine</translation>
    </message>
    <message>
      <location filename="../../TaskHoleParameters.cpp" line="69"/>
      <source>ANSI pipes</source>
      <translation type="unfinished">ANSI pipes</translation>
    </message>
    <message>
      <location filename="../../TaskHoleParameters.cpp" line="70"/>
      <source>ISO/BSP pipes</source>
      <translation type="unfinished">ISO/BSP pipes</translation>
    </message>
    <message>
      <location filename="../../TaskHoleParameters.cpp" line="71"/>
      <source>BSW whitworth</source>
      <translation type="unfinished">BSW whitworth</translation>
    </message>
    <message>
      <location filename="../../TaskHoleParameters.cpp" line="72"/>
      <source>BSF whitworth fine</source>
      <translation type="unfinished">BSF whitworth fine</translation>
    </message>
    <message>
      <location filename="../../TaskHoleParameters.cpp" line="666"/>
      <source>Medium</source>
      <comment>Distance between thread crest and hole wall, use ISO-273 nomenclature or equivalent if possible</comment>
      <translation>中</translation>
    </message>
    <message>
      <location filename="../../TaskHoleParameters.cpp" line="667"/>
      <source>Fine</source>
      <comment>Distance between thread crest and hole wall, use ISO-273 nomenclature or equivalent if possible</comment>
      <translation>細かい</translation>
    </message>
    <message>
      <location filename="../../TaskHoleParameters.cpp" line="668"/>
      <source>Coarse</source>
      <comment>Distance between thread crest and hole wall, use ISO-273 nomenclature or equivalent if possible</comment>
      <translation>粗い</translation>
    </message>
    <message>
      <location filename="../../TaskHoleParameters.cpp" line="671"/>
      <source>Normal</source>
      <comment>Distance between thread crest and hole wall, use ASME B18.2.8 nomenclature or equivalent if possible</comment>
      <translation>標準</translation>
    </message>
    <message>
      <location filename="../../TaskHoleParameters.cpp" line="672"/>
      <source>Close</source>
      <comment>Distance between thread crest and hole wall, use ASME B18.2.8 nomenclature or equivalent if possible</comment>
      <translation>閉じる</translation>
    </message>
    <message>
      <location filename="../../TaskHoleParameters.cpp" line="673"/>
      <source>Loose</source>
      <comment>Distance between thread crest and hole wall, use ASME B18.2.8 nomenclature or equivalent if possible</comment>
      <translation>あそび</translation>
    </message>
    <message>
      <location filename="../../TaskHoleParameters.cpp" line="676"/>
      <source>Normal</source>
      <comment>Distance between thread crest and hole wall</comment>
      <translation>標準</translation>
    </message>
    <message>
      <location filename="../../TaskHoleParameters.cpp" line="677"/>
      <source>Close</source>
      <comment>Distance between thread crest and hole wall</comment>
      <translation>閉じる</translation>
    </message>
    <message>
      <location filename="../../TaskHoleParameters.cpp" line="678"/>
      <source>Wide</source>
      <comment>Distance between thread crest and hole wall</comment>
      <translation>幅</translation>
    </message>
  </context>
  <context>
    <name>PartDesignGui::TaskLinearPatternParameters</name>
    <message>
      <location filename="../../TaskLinearPatternParameters.ui" line="34"/>
      <source>Direction</source>
      <translation>方向</translation>
    </message>
    <message>
      <location filename="../../TaskLinearPatternParameters.ui" line="46"/>
      <source>Reverse direction</source>
      <translation>逆方向</translation>
    </message>
    <message>
      <location filename="../../TaskLinearPatternParameters.ui" line="55"/>
      <source>Mode</source>
      <translation>モード</translation>
    </message>
    <message>
      <location filename="../../TaskLinearPatternParameters.ui" line="63"/>
      <source>Overall Length</source>
      <translation>全体長さ</translation>
    </message>
    <message>
      <location filename="../../TaskLinearPatternParameters.ui" line="68"/>
      <location filename="../../TaskLinearPatternParameters.ui" line="131"/>
      <source>Offset</source>
      <translation>オフセット</translation>
    </message>
    <message>
      <location filename="../../TaskLinearPatternParameters.ui" line="93"/>
      <source>Length</source>
      <translation>長さ</translation>
    </message>
    <message>
      <location filename="../../TaskLinearPatternParameters.ui" line="156"/>
      <source>Occurrences</source>
      <translation>回数</translation>
    </message>
    <message>
      <location filename="../../TaskLinearPatternParameters.cpp" line="330"/>
      <source>Error</source>
      <translation>エラー</translation>
    </message>
  </context>
  <context>
    <name>PartDesignGui::TaskLoftParameters</name>
    <message>
      <location filename="../../TaskLoftParameters.ui" line="20"/>
      <source>Ruled surface</source>
      <translation>線織面</translation>
    </message>
    <message>
      <location filename="../../TaskLoftParameters.ui" line="27"/>
      <source>Closed</source>
      <translation>閉じる</translation>
    </message>
    <message>
      <location filename="../../TaskLoftParameters.ui" line="34"/>
      <source>Profile</source>
      <translation>プロファイル</translation>
    </message>
    <message>
      <location filename="../../TaskLoftParameters.ui" line="42"/>
      <source>Object</source>
      <translation>オブジェクト</translation>
    </message>
    <message>
      <location filename="../../TaskLoftParameters.ui" line="65"/>
      <source>Add Section</source>
      <translation>セクションを追加</translation>
    </message>
    <message>
      <location filename="../../TaskLoftParameters.ui" line="78"/>
      <source>Remove Section</source>
      <translation>セクションを削除</translation>
    </message>
    <message>
      <location filename="../../TaskLoftParameters.ui" line="103"/>
      <source>List can be reordered by dragging</source>
      <translation>リストをドラッグして並べ替えることができます</translation>
    </message>
    <message>
      <location filename="../../TaskLoftParameters.ui" line="120"/>
      <source>Update view</source>
      <translation>ビューを更新</translation>
    </message>
    <message>
      <location filename="../../TaskLoftParameters.cpp" line="50"/>
      <source>Loft parameters</source>
      <translation>ロフトパラメーター</translation>
    </message>
    <message>
      <location filename="../../TaskLoftParameters.cpp" line="74"/>
      <source>Remove</source>
      <translation>削除</translation>
    </message>
  </context>
  <context>
    <name>PartDesignGui::TaskMirroredParameters</name>
    <message>
      <location filename="../../TaskMirroredParameters.ui" line="34"/>
      <source>Plane</source>
      <translation>平面</translation>
    </message>
    <message>
      <location filename="../../TaskMirroredParameters.cpp" line="180"/>
      <source>Error</source>
      <translation>エラー</translation>
    </message>
  </context>
  <context>
    <name>PartDesignGui::TaskMultiTransformParameters</name>
    <message>
      <location filename="../../TaskMultiTransformParameters.ui" line="32"/>
      <source>Transformations</source>
      <translation>配置変換</translation>
    </message>
    <message>
      <location filename="../../TaskMultiTransformParameters.ui" line="52"/>
      <source>OK</source>
      <translation>OK</translation>
    </message>
    <message>
      <location filename="../../TaskMultiTransformParameters.cpp" line="71"/>
      <source>Edit</source>
      <translation>編集</translation>
    </message>
    <message>
      <location filename="../../TaskMultiTransformParameters.cpp" line="77"/>
      <source>Delete</source>
      <translation>削除</translation>
    </message>
    <message>
      <location filename="../../TaskMultiTransformParameters.cpp" line="83"/>
      <source>Add mirrored transformation</source>
      <translation>鏡像変換を追加</translation>
    </message>
    <message>
      <location filename="../../TaskMultiTransformParameters.cpp" line="89"/>
      <source>Add linear pattern</source>
      <translation>直線状パターンを追加</translation>
    </message>
    <message>
      <location filename="../../TaskMultiTransformParameters.cpp" line="95"/>
      <source>Add polar pattern</source>
      <translation>円状パターンを追加</translation>
    </message>
    <message>
      <location filename="../../TaskMultiTransformParameters.cpp" line="101"/>
      <source>Add scaled transformation</source>
      <translation>拡大縮小変換を追加</translation>
    </message>
    <message>
      <location filename="../../TaskMultiTransformParameters.cpp" line="107"/>
      <source>Move up</source>
      <translation>上へ移動</translation>
    </message>
    <message>
      <location filename="../../TaskMultiTransformParameters.cpp" line="110"/>
      <source>Move down</source>
      <translation>下へ移動</translation>
    </message>
    <message>
      <location filename="../../TaskMultiTransformParameters.cpp" line="144"/>
      <source>Right-click to add</source>
      <translation>右クリックして追加</translation>
    </message>
  </context>
  <context>
    <name>PartDesignGui::TaskPadParameters</name>
    <message>
      <location filename="../../TaskPadParameters.cpp" line="40"/>
      <source>Pad parameters</source>
      <translation>パッドパラメーター</translation>
    </message>
    <message>
      <location filename="../../TaskPadParameters.cpp" line="42"/>
      <source>Offset from face at which pad will end</source>
      <translation>パッドを終了する面からのオフセット</translation>
    </message>
    <message>
      <location filename="../../TaskPadParameters.cpp" line="43"/>
      <source>Reverses pad direction</source>
      <translation>パッドの方向を反転</translation>
    </message>
    <message>
      <location filename="../../TaskPadParameters.cpp" line="70"/>
      <source>Dimension</source>
      <translation>寸法</translation>
    </message>
    <message>
      <location filename="../../TaskPadParameters.cpp" line="71"/>
      <source>To last</source>
      <translation>最後まで</translation>
    </message>
    <message>
      <location filename="../../TaskPadParameters.cpp" line="72"/>
      <source>To first</source>
      <translation>最初まで</translation>
    </message>
    <message>
      <location filename="../../TaskPadParameters.cpp" line="73"/>
      <source>Up to face</source>
      <translation>面まで</translation>
    </message>
    <message>
      <location filename="../../TaskPadParameters.cpp" line="74"/>
      <source>Two dimensions</source>
      <translation>2方向の寸法</translation>
    </message>
    <message>
      <location filename="../../TaskPadParameters.cpp" line="75"/>
      <source>Up to shape</source>
      <translation>シェイプまで</translation>
    </message>
  </context>
  <context>
    <name>PartDesignGui::TaskPadPocketParameters</name>
    <message>
      <location filename="../../TaskPadPocketParameters.ui" line="22"/>
      <source>Type</source>
      <translation>タイプ</translation>
    </message>
    <message>
      <location filename="../../TaskPadPocketParameters.ui" line="30"/>
      <source>Dimension</source>
      <translation>寸法</translation>
    </message>
    <message>
      <location filename="../../TaskPadPocketParameters.ui" line="38"/>
      <source>Length</source>
      <translation>長さ</translation>
    </message>
    <message>
      <location filename="../../TaskPadPocketParameters.ui" line="75"/>
      <source>Offset to face</source>
      <translation>面に対するオフセット</translation>
    </message>
    <message>
      <location filename="../../TaskPadPocketParameters.ui" line="130"/>
      <source>Select shape</source>
      <translation>シェイプを選択</translation>
    </message>
    <message>
      <location filename="../../TaskPadPocketParameters.ui" line="148"/>
      <source>Select all faces</source>
      <translation>すべての面を選択</translation>
    </message>
    <message>
      <location filename="../../TaskPadPocketParameters.ui" line="170"/>
      <source>Click button to enter selection mode,
         click again to end selection</source>
      <translation>ボタンをクリックして選択モードに入ります。
もう一度クリックして選択モードを終了します。</translation>
    </message>
    <message>
      <location filename="../../TaskPadPocketParameters.ui" line="174"/>
      <source>Select</source>
      <translation>選択</translation>
    </message>
    <message>
      <location filename="../../TaskPadPocketParameters.ui" line="244"/>
      <source>Direction</source>
      <translation>方向</translation>
    </message>
    <message>
      <location filename="../../TaskPadPocketParameters.ui" line="252"/>
      <source>Direction/edge:</source>
      <translation>方向/エッジ:</translation>
    </message>
    <message>
      <location filename="../../TaskPadPocketParameters.ui" line="259"/>
      <source>Set a direction or select an edge
from the model as reference</source>
      <translation>方向を設定するか、参照としてモデルからエッジを選択</translation>
    </message>
    <message>
      <location filename="../../TaskPadPocketParameters.ui" line="264"/>
      <source>Sketch normal</source>
      <translation>スケッチ法線</translation>
    </message>
    <message>
      <location filename="../../TaskPadPocketParameters.ui" line="269"/>
      <source>Select reference...</source>
      <translation>参照を選択...</translation>
    </message>
    <message>
      <location filename="../../TaskPadPocketParameters.ui" line="274"/>
      <source>Custom direction</source>
      <translation>カスタム方向</translation>
    </message>
    <message>
      <location filename="../../TaskPadPocketParameters.ui" line="284"/>
      <source>Show direction</source>
      <translation>方向を表示</translation>
    </message>
    <message>
      <location filename="../../TaskPadPocketParameters.ui" line="294"/>
      <source>Use custom vector for pad direction, otherwise
the sketch plane's normal vector will be used</source>
      <translation>パッド方向にカスタムベクトルを使用します。そうでなければ
スケッチ平面の法線ベクトルが使用されます。</translation>
    </message>
    <message>
      <location filename="../../TaskPadPocketParameters.ui" line="307"/>
      <source>x</source>
      <translation>x</translation>
    </message>
    <message>
      <location filename="../../TaskPadPocketParameters.ui" line="314"/>
      <source>x-component of direction vector</source>
      <translation>方向ベクトルの x 成分</translation>
    </message>
    <message>
      <location filename="../../TaskPadPocketParameters.ui" line="336"/>
      <source>y</source>
      <translation>y</translation>
    </message>
    <message>
      <location filename="../../TaskPadPocketParameters.ui" line="343"/>
      <source>y-component of direction vector</source>
      <translation>方向ベクトルの Y 成分</translation>
    </message>
    <message>
      <location filename="../../TaskPadPocketParameters.ui" line="365"/>
      <source>z</source>
      <translation>z</translation>
    </message>
    <message>
      <location filename="../../TaskPadPocketParameters.ui" line="372"/>
      <source>z-component of direction vector</source>
      <translation>方向ベクトルのz成分</translation>
    </message>
    <message>
      <location filename="../../TaskPadPocketParameters.ui" line="403"/>
      <source>If unchecked, the length will be
measured along the specified direction</source>
      <translation>チェックされていない場合、長さは指定された方向に沿って
測定されます</translation>
    </message>
    <message>
      <location filename="../../TaskPadPocketParameters.ui" line="407"/>
      <source>Length along sketch normal</source>
      <translation>スケッチ法線に沿った長さ</translation>
    </message>
    <message>
      <location filename="../../TaskPadPocketParameters.ui" line="145"/>
      <location filename="../../TaskPadPocketParameters.ui" line="227"/>
      <source>Applies length symmetrically to sketch plane</source>
      <translation>スケッチ平面に長さを対称に適用します。</translation>
    </message>
    <message>
      <location filename="../../TaskPadPocketParameters.ui" line="230"/>
      <source>Symmetric to plane</source>
      <translation>面に対して対称</translation>
    </message>
    <message>
      <location filename="../../TaskPadPocketParameters.ui" line="237"/>
      <source>Reversed</source>
      <translation>逆方向</translation>
    </message>
    <message>
      <location filename="../../TaskPadPocketParameters.ui" line="419"/>
      <location filename="../../TaskPadPocketParameters.ui" line="443"/>
      <source>Angle to taper the extrusion</source>
      <translation>押し出しテーパー角度</translation>
    </message>
    <message>
      <location filename="../../TaskPadPocketParameters.ui" line="422"/>
      <source>Taper angle</source>
      <translation>テーパー角度</translation>
    </message>
    <message>
      <location filename="../../TaskPadPocketParameters.ui" line="58"/>
      <source>2nd length</source>
      <translation>2番目の長さ</translation>
    </message>
    <message>
      <location filename="../../TaskPadPocketParameters.ui" line="446"/>
      <source>2nd taper angle</source>
      <translation>2番目のテーパー角度</translation>
    </message>
    <message>
      <location filename="../../TaskPadPocketParameters.ui" line="212"/>
      <source>Select face</source>
      <translation>面を選択</translation>
    </message>
    <message>
      <location filename="../../TaskPadPocketParameters.ui" line="472"/>
      <source>Update view</source>
      <translation>ビューを更新</translation>
    </message>
  </context>
  <context>
    <name>PartDesignGui::TaskPipeOrientation</name>
    <message>
      <location filename="../../TaskPipeOrientation.ui" line="22"/>
      <source>Orientation mode</source>
      <translation>方向モード</translation>
    </message>
    <message>
      <location filename="../../TaskPipeOrientation.ui" line="36"/>
      <source>Standard</source>
      <translation>標準</translation>
    </message>
    <message>
      <location filename="../../TaskPipeOrientation.ui" line="41"/>
      <source>Fixed</source>
      <translation>固定</translation>
    </message>
    <message>
      <location filename="../../TaskPipeOrientation.ui" line="46"/>
      <source>Frenet</source>
      <translation>フレネ</translation>
    </message>
    <message>
      <location filename="../../TaskPipeOrientation.ui" line="51"/>
      <source>Auxiliary</source>
      <translation>補助</translation>
    </message>
    <message>
      <location filename="../../TaskPipeOrientation.ui" line="56"/>
      <source>Binormal</source>
      <translation>従法線</translation>
    </message>
    <message>
      <location filename="../../TaskPipeOrientation.ui" line="76"/>
      <source>Curvilinear equivalence</source>
      <translation type="unfinished">Curvilinear equivalence</translation>
    </message>
    <message>
      <location filename="../../TaskPipeOrientation.ui" line="83"/>
      <source>Profile</source>
      <translation>プロファイル</translation>
    </message>
    <message>
      <location filename="../../TaskPipeOrientation.ui" line="91"/>
      <source>Object</source>
      <translation>オブジェクト</translation>
    </message>
    <message>
      <location filename="../../TaskPipeOrientation.ui" line="125"/>
      <source>Add Edge</source>
      <translation>エッジを追加</translation>
    </message>
    <message>
      <location filename="../../TaskPipeOrientation.ui" line="144"/>
      <source>Remove Edge</source>
      <translation>エッジを削除</translation>
    </message>
    <message>
      <location filename="../../TaskPipeOrientation.ui" line="166"/>
      <source>Set the constant binormal vector used to calculate the profiles orientation</source>
      <translation>プロファイルの方向を計算するのに使用される定従法線ベクトルを設定</translation>
    </message>
    <message>
      <location filename="../../TaskPipeOrientation.ui" line="190"/>
      <source>X</source>
      <translation>X</translation>
    </message>
    <message>
      <location filename="../../TaskPipeOrientation.ui" line="197"/>
      <source>Y</source>
      <translation>Y</translation>
    </message>
    <message>
      <location filename="../../TaskPipeOrientation.ui" line="204"/>
      <source>Z</source>
      <translation>Z</translation>
    </message>
    <message>
      <location filename="../../TaskPipeParameters.cpp" line="583"/>
      <source>Section orientation</source>
      <translation>選択方向</translation>
    </message>
    <message>
      <location filename="../../TaskPipeParameters.cpp" line="611"/>
      <source>Remove</source>
      <translation>削除</translation>
    </message>
  </context>
  <context>
    <name>PartDesignGui::TaskPipeParameters</name>
    <message>
      <location filename="../../TaskPipeParameters.ui" line="20"/>
      <source>Profile</source>
      <translation>プロファイル</translation>
    </message>
    <message>
      <location filename="../../TaskPipeParameters.ui" line="28"/>
      <location filename="../../TaskPipeParameters.ui" line="93"/>
      <source>Object</source>
      <translation>オブジェクト</translation>
    </message>
    <message>
      <location filename="../../TaskPipeParameters.ui" line="51"/>
      <source>Corner Transition</source>
      <translation>角の遷移</translation>
    </message>
    <message>
      <location filename="../../TaskPipeParameters.ui" line="65"/>
      <source>Transformed</source>
      <translation>変換</translation>
    </message>
    <message>
      <location filename="../../TaskPipeParameters.ui" line="70"/>
      <source>Right Corner</source>
      <translation>右角</translation>
    </message>
    <message>
      <location filename="../../TaskPipeParameters.ui" line="75"/>
      <source>Round Corner</source>
      <translation>角の丸め</translation>
    </message>
    <message>
      <location filename="../../TaskPipeParameters.ui" line="85"/>
      <source>Path to sweep along</source>
      <translation>スイープ経路</translation>
    </message>
    <message>
      <location filename="../../TaskPipeParameters.ui" line="119"/>
      <source>Add Edge</source>
      <translation>エッジを追加</translation>
    </message>
    <message>
      <location filename="../../TaskPipeParameters.ui" line="138"/>
      <source>Remove Edge</source>
      <translation>エッジを削除</translation>
    </message>
    <message>
      <location filename="../../TaskPipeParameters.cpp" line="68"/>
      <source>Pipe parameters</source>
      <translation>パイプパラメーター</translation>
    </message>
    <message>
      <location filename="../../TaskPipeParameters.cpp" line="88"/>
      <source>Remove</source>
      <translation>削除</translation>
    </message>
    <message>
      <location filename="../../TaskPipeParameters.cpp" line="451"/>
      <location filename="../../TaskPipeParameters.cpp" line="563"/>
      <source>Input error</source>
      <translation>入力エラー</translation>
    </message>
    <message>
      <location filename="../../TaskPipeParameters.cpp" line="451"/>
      <source>No active body</source>
      <translation>アクティブなボディーがありません。</translation>
    </message>
  </context>
  <context>
    <name>PartDesignGui::TaskPipeScaling</name>
    <message>
      <location filename="../../TaskPipeScaling.ui" line="22"/>
      <source>Transform mode</source>
      <translation>変換モード</translation>
    </message>
    <message>
      <location filename="../../TaskPipeScaling.ui" line="36"/>
      <source>Constant</source>
      <translation>定数</translation>
    </message>
    <message>
      <location filename="../../TaskPipeScaling.ui" line="41"/>
      <source>Multisection</source>
      <translation>マルチ断面</translation>
    </message>
    <message>
      <location filename="../../TaskPipeScaling.ui" line="64"/>
      <source>Add Section</source>
      <translation>セクションを追加</translation>
    </message>
    <message>
      <location filename="../../TaskPipeScaling.ui" line="77"/>
      <source>Remove Section</source>
      <translation>セクションを削除</translation>
    </message>
    <message>
      <location filename="../../TaskPipeScaling.ui" line="102"/>
      <source>List can be reordered by dragging</source>
      <translation>リストをドラッグして並べ替えることができます</translation>
    </message>
    <message>
      <location filename="../../TaskPipeParameters.cpp" line="886"/>
      <source>Section transformation</source>
      <translation>断面変換</translation>
    </message>
    <message>
      <location filename="../../TaskPipeParameters.cpp" line="903"/>
      <source>Remove</source>
      <translation>削除</translation>
    </message>
  </context>
  <context>
    <name>PartDesignGui::TaskPocketParameters</name>
    <message>
      <location filename="../../TaskPocketParameters.cpp" line="40"/>
      <source>Pocket parameters</source>
      <translation>ポケットパラメーター</translation>
    </message>
    <message>
      <location filename="../../TaskPocketParameters.cpp" line="43"/>
      <source>Offset from face at which pocket will end</source>
      <translation>ポケットを終了する面からのオフセット</translation>
    </message>
    <message>
      <location filename="../../TaskPocketParameters.cpp" line="44"/>
      <source>Reverses pocket direction</source>
      <translation>ポケットの方向を反転</translation>
    </message>
    <message>
      <location filename="../../TaskPocketParameters.cpp" line="71"/>
      <source>Dimension</source>
      <translation>寸法</translation>
    </message>
    <message>
      <location filename="../../TaskPocketParameters.cpp" line="72"/>
      <source>Through all</source>
      <translation>貫通</translation>
    </message>
    <message>
      <location filename="../../TaskPocketParameters.cpp" line="73"/>
      <source>To first</source>
      <translation>最初まで</translation>
    </message>
    <message>
      <location filename="../../TaskPocketParameters.cpp" line="74"/>
      <source>Up to face</source>
      <translation>面まで</translation>
    </message>
    <message>
      <location filename="../../TaskPocketParameters.cpp" line="75"/>
      <source>Two dimensions</source>
      <translation>2方向の寸法</translation>
    </message>
    <message>
      <location filename="../../TaskPocketParameters.cpp" line="76"/>
      <source>Up to shape</source>
      <translation>シェイプまで</translation>
    </message>
  </context>
  <context>
    <name>PartDesignGui::TaskPolarPatternParameters</name>
    <message>
      <location filename="../../TaskPolarPatternParameters.ui" line="34"/>
      <source>Axis</source>
      <translation>軸</translation>
    </message>
    <message>
      <location filename="../../TaskPolarPatternParameters.ui" line="46"/>
      <source>Reverse direction</source>
      <translation>逆方向</translation>
    </message>
    <message>
      <location filename="../../TaskPolarPatternParameters.ui" line="55"/>
      <source>Mode</source>
      <translation>モード</translation>
    </message>
    <message>
      <location filename="../../TaskPolarPatternParameters.ui" line="63"/>
      <source>Overall Angle</source>
      <translation>全体角度</translation>
    </message>
    <message>
      <location filename="../../TaskPolarPatternParameters.ui" line="68"/>
      <source>Offset Angle</source>
      <translation>オフセット角度</translation>
    </message>
    <message>
      <location filename="../../TaskPolarPatternParameters.ui" line="93"/>
      <source>Angle</source>
      <translation>角度</translation>
    </message>
    <message>
      <location filename="../../TaskPolarPatternParameters.ui" line="137"/>
      <source>Offset</source>
      <translation>オフセット</translation>
    </message>
    <message>
      <location filename="../../TaskPolarPatternParameters.ui" line="168"/>
      <source>Occurrences</source>
      <translation>回数</translation>
    </message>
    <message>
      <location filename="../../TaskPolarPatternParameters.cpp" line="329"/>
      <source>Error</source>
      <translation>エラー</translation>
    </message>
  </context>
  <context>
    <name>PartDesignGui::TaskPrimitiveParameters</name>
    <message>
      <location filename="../../TaskPrimitiveParameters.cpp" line="982"/>
      <source>Attachment</source>
      <translation>アタッチメント</translation>
    </message>
  </context>
  <context>
    <name>PartDesignGui::TaskRevolutionParameters</name>
    <message>
      <location filename="../../TaskRevolutionParameters.ui" line="22"/>
      <source>Type</source>
      <translation>タイプ</translation>
    </message>
    <message>
      <location filename="../../TaskRevolutionParameters.ui" line="30"/>
      <location filename="../../TaskRevolutionParameters.cpp" line="188"/>
      <source>Dimension</source>
      <translation>寸法</translation>
    </message>
    <message>
      <location filename="../../TaskRevolutionParameters.ui" line="42"/>
      <source>Axis:</source>
      <translation>軸:</translation>
    </message>
    <message>
      <location filename="../../TaskRevolutionParameters.ui" line="50"/>
      <location filename="../../TaskRevolutionParameters.cpp" line="235"/>
      <source>Base X axis</source>
      <translation>ベースX軸</translation>
    </message>
    <message>
      <location filename="../../TaskRevolutionParameters.ui" line="55"/>
      <location filename="../../TaskRevolutionParameters.cpp" line="236"/>
      <source>Base Y axis</source>
      <translation>ベースY軸</translation>
    </message>
    <message>
      <location filename="../../TaskRevolutionParameters.ui" line="60"/>
      <location filename="../../TaskRevolutionParameters.cpp" line="237"/>
      <source>Base Z axis</source>
      <translation>ベースZ軸</translation>
    </message>
    <message>
      <location filename="../../TaskRevolutionParameters.ui" line="65"/>
      <source>Horizontal sketch axis</source>
      <translation>水平スケッチ軸</translation>
    </message>
    <message>
      <location filename="../../TaskRevolutionParameters.ui" line="70"/>
      <source>Vertical sketch axis</source>
      <translation>垂直スケッチ軸</translation>
    </message>
    <message>
      <location filename="../../TaskRevolutionParameters.ui" line="75"/>
      <location filename="../../TaskRevolutionParameters.cpp" line="244"/>
      <source>Select reference...</source>
      <translation>参照を選択...</translation>
    </message>
    <message>
      <location filename="../../TaskRevolutionParameters.ui" line="87"/>
      <source>Angle:</source>
      <translation>角度:</translation>
    </message>
    <message>
      <location filename="../../TaskRevolutionParameters.ui" line="154"/>
      <source>Symmetric to plane</source>
      <translation>面に対して対称</translation>
    </message>
    <message>
      <location filename="../../TaskRevolutionParameters.ui" line="161"/>
      <source>Reversed</source>
      <translation>逆方向</translation>
    </message>
    <message>
      <location filename="../../TaskRevolutionParameters.ui" line="120"/>
      <source>2nd angle</source>
      <translation>2番目の角度</translation>
    </message>
    <message>
      <location filename="../../TaskRevolutionParameters.ui" line="170"/>
      <location filename="../../TaskRevolutionParameters.cpp" line="152"/>
      <location filename="../../TaskRevolutionParameters.cpp" line="467"/>
      <source>Face</source>
      <translation>面</translation>
    </message>
    <message>
      <location filename="../../TaskRevolutionParameters.ui" line="192"/>
      <source>Update view</source>
      <translation>ビューを更新</translation>
    </message>
    <message>
      <location filename="../../TaskRevolutionParameters.cpp" line="190"/>
      <source>To last</source>
      <translation>最後まで</translation>
    </message>
    <message>
      <location filename="../../TaskRevolutionParameters.cpp" line="193"/>
      <source>Through all</source>
      <translation>貫通</translation>
    </message>
    <message>
      <location filename="../../TaskRevolutionParameters.cpp" line="195"/>
      <source>To first</source>
      <translation>最初まで</translation>
    </message>
    <message>
      <location filename="../../TaskRevolutionParameters.cpp" line="196"/>
      <source>Up to face</source>
      <translation>面まで</translation>
    </message>
    <message>
      <location filename="../../TaskRevolutionParameters.cpp" line="197"/>
      <source>Two dimensions</source>
      <translation>2方向の寸法</translation>
    </message>
    <message>
      <location filename="../../TaskRevolutionParameters.cpp" line="454"/>
      <source>No face selected</source>
      <translation>面が選択されていません</translation>
    </message>
  </context>
  <context>
    <name>PartDesignGui::TaskScaledParameters</name>
    <message>
      <location filename="../../TaskScaledParameters.ui" line="34"/>
      <source>Factor</source>
      <translation>係数</translation>
    </message>
    <message>
      <location filename="../../TaskScaledParameters.ui" line="48"/>
      <source>Occurrences</source>
      <translation>回数</translation>
    </message>
  </context>
  <context>
    <name>PartDesignGui::TaskShapeBinder</name>
    <message>
      <location filename="../../TaskShapeBinder.ui" line="22"/>
      <source>Object</source>
      <translation>オブジェクト</translation>
    </message>
    <message>
      <location filename="../../TaskShapeBinder.ui" line="48"/>
      <source>Add Geometry</source>
      <translation>ジオメトリを追加</translation>
    </message>
    <message>
      <location filename="../../TaskShapeBinder.ui" line="67"/>
      <source>Remove Geometry</source>
      <translation>ジオメトリを削除</translation>
    </message>
    <message>
      <location filename="../../TaskShapeBinder.cpp" line="60"/>
      <source>Datum shape parameters</source>
      <translation>データム形状パラメーター</translation>
    </message>
    <message>
      <location filename="../../TaskShapeBinder.cpp" line="130"/>
      <source>Remove</source>
      <translation>削除</translation>
    </message>
  </context>
  <context>
    <name>PartDesignGui::TaskSketchBasedParameters</name>
    <message>
      <location filename="../../TaskSketchBasedParameters.cpp" line="174"/>
      <source>Face</source>
      <translation>面</translation>
    </message>
  </context>
  <context>
    <name>PartDesignGui::TaskThicknessParameters</name>
    <message>
      <location filename="../../TaskThicknessParameters.ui" line="20"/>
      <source>Click button to enter selection mode,
click again to end selection</source>
      <translation>ボタンをクリックして選択モードに入ります。
もう一度クリックして選択モードを終了します。</translation>
    </message>
    <message>
      <location filename="../../TaskThicknessParameters.ui" line="24"/>
      <source>Select</source>
      <translation>選択</translation>
    </message>
    <message>
      <location filename="../../TaskThicknessParameters.ui" line="34"/>
      <source>- select an item to highlight it
- double-click on an item to see the features</source>
      <translation>- 強調表示する項目を選択します
- 項目をダブルクリックしてフィーチャを表示します</translation>
    </message>
    <message>
      <location filename="../../TaskThicknessParameters.ui" line="47"/>
      <source>Thickness</source>
      <translation>厚み</translation>
    </message>
    <message>
      <location filename="../../TaskThicknessParameters.ui" line="76"/>
      <source>Mode</source>
      <translation>モード</translation>
    </message>
    <message>
      <location filename="../../TaskThicknessParameters.ui" line="84"/>
      <source>Skin</source>
      <translation>スキン</translation>
    </message>
    <message>
      <location filename="../../TaskThicknessParameters.ui" line="89"/>
      <source>Pipe</source>
      <translation>パイプ</translation>
    </message>
    <message>
      <location filename="../../TaskThicknessParameters.ui" line="94"/>
      <source>Recto Verso</source>
      <translation>右から左へ</translation>
    </message>
    <message>
      <location filename="../../TaskThicknessParameters.ui" line="102"/>
      <source>Join Type</source>
      <translation>接合タイプ</translation>
    </message>
    <message>
      <location filename="../../TaskThicknessParameters.ui" line="110"/>
      <source>Arc</source>
      <translation>円弧</translation>
    </message>
    <message>
      <location filename="../../TaskThicknessParameters.ui" line="115"/>
      <location filename="../../TaskThicknessParameters.ui" line="125"/>
      <source>Intersection</source>
      <translation>共通集合</translation>
    </message>
    <message>
      <location filename="../../TaskThicknessParameters.ui" line="132"/>
      <source>Make thickness inwards</source>
      <translation>内側に向かって厚みを作成</translation>
    </message>
    <message>
      <location filename="../../TaskThicknessParameters.cpp" line="260"/>
      <source>Empty thickness created !
</source>
      <translation>空の厚みが作成されました!
</translation>
    </message>
  </context>
  <context>
    <name>PartDesignGui::TaskTransformedMessages</name>
    <message>
      <location filename="../../TaskTransformedMessages.cpp" line="37"/>
      <source>Transformed feature messages</source>
      <translation>変換フィーチャメッセージ</translation>
    </message>
  </context>
  <context>
    <name>PartDesignGui::TaskTransformedParameters</name>
    <message>
      <location filename="../../TaskTransformedParameters.cpp" line="104"/>
      <source>Remove</source>
      <translation>削除</translation>
    </message>
    <message>
      <location filename="../../TaskTransformedParameters.cpp" line="404"/>
      <source>Normal sketch axis</source>
      <translation>通常のスケッチ軸</translation>
    </message>
    <message>
      <location filename="../../TaskTransformedParameters.cpp" line="405"/>
      <source>Vertical sketch axis</source>
      <translation>垂直スケッチ軸</translation>
    </message>
    <message>
      <location filename="../../TaskTransformedParameters.cpp" line="406"/>
      <source>Horizontal sketch axis</source>
      <translation>水平スケッチ軸</translation>
    </message>
    <message>
      <location filename="../../TaskTransformedParameters.cpp" line="408"/>
      <location filename="../../TaskTransformedParameters.cpp" line="444"/>
      <source>Construction line %1</source>
      <translation>補助線 %1</translation>
    </message>
    <message>
      <location filename="../../TaskTransformedParameters.cpp" line="422"/>
      <source>Base X axis</source>
      <translation>ベースX軸</translation>
    </message>
    <message>
      <location filename="../../TaskTransformedParameters.cpp" line="423"/>
      <source>Base Y axis</source>
      <translation>ベースY軸</translation>
    </message>
    <message>
      <location filename="../../TaskTransformedParameters.cpp" line="424"/>
      <source>Base Z axis</source>
      <translation>ベースZ軸</translation>
    </message>
    <message>
      <location filename="../../TaskTransformedParameters.cpp" line="432"/>
      <location filename="../../TaskTransformedParameters.cpp" line="468"/>
      <source>Select reference...</source>
      <translation>参照を選択...</translation>
    </message>
    <message>
      <location filename="../../TaskTransformedParameters.cpp" line="458"/>
      <source>Base XY plane</source>
      <translation>ベースXY平面</translation>
    </message>
    <message>
      <location filename="../../TaskTransformedParameters.cpp" line="459"/>
      <source>Base YZ plane</source>
      <translation>ベースYZ平面</translation>
    </message>
    <message>
      <location filename="../../TaskTransformedParameters.cpp" line="460"/>
      <source>Base XZ plane</source>
      <translation>ベースXZ平面</translation>
    </message>
    <message>
      <location filename="../../TaskTransformedParameters.ui" line="35"/>
      <source>Transform body</source>
      <translation>ボディーを変換</translation>
    </message>
    <message>
      <location filename="../../TaskTransformedParameters.ui" line="48"/>
      <source>Transform tool shapes</source>
      <translation>ツールシェイプを変換</translation>
    </message>
    <message>
      <location filename="../../TaskTransformedParameters.ui" line="78"/>
      <source>Add feature</source>
      <translation>フィーチャーを追加</translation>
    </message>
    <message>
      <location filename="../../TaskTransformedParameters.ui" line="88"/>
      <source>Remove feature</source>
      <translation>フィーチャーを削除</translation>
    </message>
    <message>
      <location filename="../../TaskTransformedParameters.ui" line="106"/>
      <source>List can be reordered by dragging</source>
      <translation>リストをドラッグして並べ替えることができます</translation>
    </message>
    <message>
      <location filename="../../TaskTransformedParameters.ui" line="122"/>
      <source>Update view</source>
      <translation>ビューを更新</translation>
    </message>
  </context>
  <context>
    <name>PartDesignGui::ViewProviderChamfer</name>
    <message>
      <location filename="../../ViewProviderChamfer.h" line="41"/>
      <source>Chamfer parameters</source>
      <translation>面取りパラメーター</translation>
    </message>
  </context>
  <context>
    <name>PartDesignGui::ViewProviderDatum</name>
    <message>
      <location filename="../../ViewProviderDatum.cpp" line="115"/>
      <source>Datum Plane parameters</source>
      <translation>データム平面パラメーター</translation>
    </message>
    <message>
      <location filename="../../ViewProviderDatum.cpp" line="120"/>
      <source>Datum Line parameters</source>
      <translation>データム直線のパラメーター</translation>
    </message>
    <message>
      <location filename="../../ViewProviderDatum.cpp" line="125"/>
      <source>Datum Point parameters</source>
      <translation>データム点パラメーター</translation>
    </message>
    <message>
      <location filename="../../ViewProviderDatum.cpp" line="130"/>
      <source>Local Coordinate System parameters</source>
      <translation>ローカル座標系パラメーター</translation>
    </message>
  </context>
  <context>
    <name>PartDesignGui::ViewProviderDraft</name>
    <message>
      <location filename="../../ViewProviderDraft.h" line="42"/>
      <source>Draft parameters</source>
      <translation>抜き勾配パラメーター</translation>
    </message>
  </context>
  <context>
    <name>PartDesignGui::ViewProviderFillet</name>
    <message>
      <location filename="../../ViewProviderFillet.h" line="41"/>
      <source>Fillet parameters</source>
      <translation>フィレットパラメーター</translation>
    </message>
  </context>
  <context>
    <name>PartDesignGui::ViewProviderLinearPattern</name>
    <message>
      <location filename="../../ViewProviderLinearPattern.h" line="37"/>
      <source>LinearPattern parameters</source>
      <translation>直線状パターンパラメーター</translation>
    </message>
  </context>
  <context>
    <name>PartDesignGui::ViewProviderMultiTransform</name>
    <message>
      <location filename="../../ViewProviderMultiTransform.h" line="37"/>
      <source>MultiTransform parameters</source>
      <translation>マルチ変換パラメーター</translation>
    </message>
  </context>
  <context>
    <name>PartDesignGui::ViewProviderPolarPattern</name>
    <message>
      <location filename="../../ViewProviderPolarPattern.h" line="37"/>
      <source>PolarPattern parameters</source>
      <translation>円状パターンパラメーター</translation>
    </message>
  </context>
  <context>
    <name>PartDesignGui::ViewProviderScaled</name>
    <message>
      <location filename="../../ViewProviderScaled.h" line="37"/>
      <source>Scaled parameters</source>
      <translation>拡大縮小パラメーター</translation>
    </message>
  </context>
  <context>
    <name>PartDesignGui::ViewProviderThickness</name>
    <message>
      <location filename="../../ViewProviderThickness.h" line="41"/>
      <source>Thickness parameters</source>
      <translation>厚みパラメーター</translation>
    </message>
  </context>
  <context>
    <name>PartDesignGuii::ViewProviderMirrored</name>
    <message>
      <location filename="../../ViewProviderMirrored.h" line="37"/>
      <source>Mirrored parameters</source>
      <translation>鏡像パラメーター</translation>
    </message>
  </context>
  <context>
    <name>PartDesign_CompPrimitiveAdditive</name>
    <message>
      <location filename="../../CommandPrimitive.cpp" line="198"/>
      <source>Create an additive box by its width, height, and length</source>
      <translation>幅、高さ、厚みから加算直方体を作成</translation>
    </message>
    <message>
      <location filename="../../CommandPrimitive.cpp" line="202"/>
      <source>Create an additive cylinder by its radius, height, and angle</source>
      <translation>半径、高さ、角度から加算円柱を作成</translation>
    </message>
    <message>
      <location filename="../../CommandPrimitive.cpp" line="206"/>
      <source>Create an additive sphere by its radius and various angles</source>
      <translation>半径と複数の角度から加算球を作成</translation>
    </message>
    <message>
      <location filename="../../CommandPrimitive.cpp" line="210"/>
      <source>Create an additive cone</source>
      <translation>加算円錐を作成</translation>
    </message>
    <message>
      <location filename="../../CommandPrimitive.cpp" line="214"/>
      <source>Create an additive ellipsoid</source>
      <translation>加算楕円体を作成</translation>
    </message>
    <message>
      <location filename="../../CommandPrimitive.cpp" line="218"/>
      <source>Create an additive torus</source>
      <translation>加算トーラスを作成</translation>
    </message>
    <message>
      <location filename="../../CommandPrimitive.cpp" line="222"/>
      <source>Create an additive prism</source>
      <translation>加算角柱を作成</translation>
    </message>
    <message>
      <location filename="../../CommandPrimitive.cpp" line="226"/>
      <source>Create an additive wedge</source>
      <translation>加算ウェッジを作成</translation>
    </message>
  </context>
  <context>
    <name>PartDesign_CompPrimitiveSubtractive</name>
    <message>
      <location filename="../../CommandPrimitive.cpp" line="350"/>
      <source>Create a subtractive box by its width, height and length</source>
      <translation>幅、高さ、厚みから減算直方体を作成</translation>
    </message>
    <message>
      <location filename="../../CommandPrimitive.cpp" line="354"/>
      <source>Create a subtractive cylinder by its radius, height and angle</source>
      <translation>半径、高さ、角度から減算円柱を作成</translation>
    </message>
    <message>
      <location filename="../../CommandPrimitive.cpp" line="358"/>
      <source>Create a subtractive sphere by its radius and various angles</source>
      <translation>半径と複数の角度から減算球を作成</translation>
    </message>
    <message>
      <location filename="../../CommandPrimitive.cpp" line="362"/>
      <source>Create a subtractive cone</source>
      <translation>減算円錐を作成</translation>
    </message>
    <message>
      <location filename="../../CommandPrimitive.cpp" line="366"/>
      <source>Create a subtractive ellipsoid</source>
      <translation>減算楕円体を作成</translation>
    </message>
    <message>
      <location filename="../../CommandPrimitive.cpp" line="370"/>
      <source>Create a subtractive torus</source>
      <translation>減算トーラスを作成</translation>
    </message>
    <message>
      <location filename="../../CommandPrimitive.cpp" line="374"/>
      <source>Create a subtractive prism</source>
      <translation>減算角柱を作成</translation>
    </message>
    <message>
      <location filename="../../CommandPrimitive.cpp" line="378"/>
      <source>Create a subtractive wedge</source>
      <translation>減算ウェッジを作成</translation>
    </message>
  </context>
  <context>
    <name>PartDesign_MoveFeature</name>
    <message>
      <location filename="../../CommandBody.cpp" line="738"/>
      <source>Select body</source>
      <translation>ボディーを選択</translation>
    </message>
    <message>
      <location filename="../../CommandBody.cpp" line="739"/>
      <source>Select a body from the list</source>
      <translation>リストからボディーを選択</translation>
    </message>
  </context>
  <context>
    <name>PartDesign_MoveFeatureInTree</name>
    <message>
      <location filename="../../CommandBody.cpp" line="891"/>
      <source>Select feature</source>
      <translation>フィーチャーを選択</translation>
    </message>
    <message>
      <location filename="../../CommandBody.cpp" line="892"/>
      <source>Select a feature from the list</source>
      <translation>リストからフィーチャーを選択</translation>
    </message>
    <message>
      <location filename="../../CommandBody.cpp" line="962"/>
      <source>Move tip</source>
      <translation>tipを移動</translation>
    </message>
    <message>
      <location filename="../../CommandBody.cpp" line="963"/>
      <source>The moved feature appears after the currently set tip.</source>
      <translation>移動したフィーチャは、現在設定されている先端の後に表示されます。</translation>
    </message>
    <message>
      <location filename="../../CommandBody.cpp" line="964"/>
      <source>Do you want the last feature to be the new tip?</source>
      <translation>最後のフィーチャを新しいチップにしたいですか？</translation>
    </message>
  </context>
  <context>
    <name>QObject</name>
    <message>
      <location filename="../../Command.cpp" line="140"/>
      <source>Invalid selection</source>
      <translation>無効な選択です。</translation>
    </message>
    <message>
      <location filename="../../Command.cpp" line="140"/>
      <source>There are no attachment modes that fit selected objects. Select something else.</source>
      <translation>選択したオブジェクトに合うアタッチメントモードがありません。他のものを選択してください。</translation>
    </message>
    <message>
      <location filename="../../Command.cpp" line="146"/>
      <location filename="../../Command.cpp" line="149"/>
      <location filename="../../Command.cpp" line="151"/>
      <source>Error</source>
      <translation>エラー</translation>
    </message>
    <message>
      <location filename="../../Command.cpp" line="146"/>
      <source>There is no active body. Please make a body active before inserting a datum entity.</source>
      <translation>アクティブなボディーがありません。データムエンティティを挿入する前にアクティブなボディーを作成してください。</translation>
    </message>
    <message>
      <location filename="../../Command.cpp" line="410"/>
      <source>Sub-Shape Binder</source>
      <translation>サブシェイプバインダー</translation>
    </message>
    <message>
      <location filename="../../SketchWorkflow.cpp" line="734"/>
      <source>Several sub-elements selected</source>
      <translation>いくつかのサブ要素が選択されています</translation>
    </message>
    <message>
      <location filename="../../SketchWorkflow.cpp" line="735"/>
      <source>You have to select a single face as support for a sketch!</source>
      <translation>スケッチサポートとして単一の面を選択する必要があります！</translation>
    </message>
    <message>
      <location filename="../../SketchWorkflow.cpp" line="738"/>
      <source>No support face selected</source>
      <translation>サポート面が選択されていません</translation>
    </message>
    <message>
      <location filename="../../SketchWorkflow.cpp" line="739"/>
      <source>You have to select a face as support for a sketch!</source>
      <translation>スケッチサポートとして面を選択する必要があります！</translation>
    </message>
    <message>
      <location filename="../../SketchWorkflow.cpp" line="742"/>
      <source>No planar support</source>
      <translation>平面のサポートがありません</translation>
    </message>
    <message>
      <location filename="../../SketchWorkflow.cpp" line="743"/>
      <source>You need a planar face as support for a sketch!</source>
      <translation>スケッチサポートとして平面が必要です！</translation>
    </message>
    <message>
      <location filename="../../SketchWorkflow.cpp" line="746"/>
      <source>No valid planes in this document</source>
      <translation>このドキュメントには有効な平面がありません。</translation>
    </message>
    <message>
      <location filename="../../SketchWorkflow.cpp" line="747"/>
      <source>Please create a plane first or select a face to sketch on</source>
      <translation>まず平面を作成するか、またはスケッチを描く面を選択してください。</translation>
    </message>
    <message>
      <location filename="../../ViewProviderHole.cpp" line="78"/>
      <location filename="../../ViewProviderDatum.cpp" line="250"/>
      <location filename="../../ViewProviderPrimitive.cpp" line="69"/>
      <location filename="../../SketchWorkflow.cpp" line="661"/>
      <location filename="../../ViewProvider.cpp" line="106"/>
      <location filename="../../ViewProviderBoolean.cpp" line="79"/>
      <location filename="../../ViewProviderShapeBinder.cpp" line="96"/>
      <location filename="../../Command.cpp" line="1014"/>
      <source>A dialog is already open in the task panel</source>
      <translation>タスクパネルで既にダイアログが開かれています</translation>
    </message>
    <message>
      <location filename="../../ViewProviderHole.cpp" line="79"/>
      <location filename="../../ViewProviderDatum.cpp" line="251"/>
      <location filename="../../ViewProviderPrimitive.cpp" line="70"/>
      <location filename="../../SketchWorkflow.cpp" line="662"/>
      <location filename="../../ViewProvider.cpp" line="107"/>
      <location filename="../../ViewProviderBoolean.cpp" line="80"/>
      <location filename="../../ViewProviderShapeBinder.cpp" line="97"/>
      <location filename="../../Command.cpp" line="1015"/>
      <source>Do you want to close this dialog?</source>
      <translation>このダイアログを閉じますか？</translation>
    </message>
    <message>
      <location filename="../../Command.cpp" line="894"/>
      <source>Cannot use this command as there is no solid to subtract from.</source>
      <translation>このコマンドを使うことはできません。このコマンドから引くソリッドがないためです。</translation>
    </message>
    <message>
      <location filename="../../Command.cpp" line="895"/>
      <source>Ensure that the body contains a feature before attempting a subtractive command.</source>
      <translation>減算コマンドを実行する前に、ボディにフィーチャーが含まれていることを確認します。</translation>
    </message>
    <message>
      <location filename="../../Command.cpp" line="916"/>
      <source>Cannot use selected object. Selected object must belong to the active body</source>
      <translation>選択したオブジェクトを使用できません。選択したオブジェクトはアクティブなボディーに属している必要があります。</translation>
    </message>
    <message>
      <location filename="../../Command.cpp" line="917"/>
      <source>Consider using a ShapeBinder or a BaseFeature to reference external geometry in a body.</source>
      <translation>ボディ内の外部ジオメトリを参照するためにShapeBinderまたはBaseFeatureを使用することを検討してください。</translation>
    </message>
    <message>
      <location filename="../../Command.cpp" line="939"/>
      <source>No sketch to work on</source>
      <translation>作業のためのスケッチがありません。</translation>
    </message>
    <message>
      <location filename="../../Command.cpp" line="940"/>
      <source>No sketch is available in the document</source>
      <translation>ドキュメント内に使用可能なスケッチがありません。</translation>
    </message>
    <message>
      <location filename="../../Command.cpp" line="1644"/>
      <location filename="../../Command.cpp" line="1670"/>
      <source>Wrong selection</source>
      <translation>誤った選択</translation>
    </message>
    <message>
      <location filename="../../Command.cpp" line="1645"/>
      <source>Select an edge, face, or body from a single body.</source>
      <translation>単一のボディからエッジ、面、またはボディを選択してください。</translation>
    </message>
    <message>
      <location filename="../../Command.cpp" line="1649"/>
      <location filename="../../Command.cpp" line="1981"/>
      <source>Selection is not in Active Body</source>
      <translation>選択されているのはアクティブなボディーではありません。</translation>
    </message>
    <message>
      <location filename="../../Command.cpp" line="1650"/>
      <source>Select an edge, face, or body from an active body.</source>
      <translation>アクティブなボディーからエッジ、面、またはボディを選択してください。</translation>
    </message>
    <message>
      <location filename="../../Command.cpp" line="1660"/>
      <source>Wrong object type</source>
      <translation>間違ったオブジェクトの種類</translation>
    </message>
    <message>
      <location filename="../../Command.cpp" line="1661"/>
      <source>%1 works only on parts.</source>
      <translation>%1は部品にのみ適用できます。</translation>
    </message>
    <message>
      <location filename="../../Command.cpp" line="1671"/>
      <source>Shape of the selected Part is empty</source>
      <translation>選択したパーツの形状が空です。</translation>
    </message>
    <message>
      <location filename="../../Command.cpp" line="1982"/>
      <source>Please select only one feature in an active body.</source>
      <translation>アクティブなボディー内にあるフィーチャーを1つだけ選択してください。</translation>
    </message>
    <message>
      <location filename="../../CommandBody.cpp" line="69"/>
      <source>Part creation failed</source>
      <translation>パーツ作成失敗</translation>
    </message>
    <message>
      <location filename="../../CommandBody.cpp" line="70"/>
      <source>Failed to create a part object.</source>
      <translation>パーツオブジェクトの作成に失敗しました。</translation>
    </message>
    <message>
      <location filename="../../CommandBody.cpp" line="114"/>
      <location filename="../../CommandBody.cpp" line="119"/>
      <location filename="../../CommandBody.cpp" line="132"/>
      <location filename="../../CommandBody.cpp" line="181"/>
      <source>Bad base feature</source>
      <translation>不正なベースフィーチャー</translation>
    </message>
    <message>
      <location filename="../../CommandBody.cpp" line="115"/>
      <source>Body can't be based on a PartDesign feature.</source>
      <translation>PartDesign フィーチャーはボディーのベースにできません。</translation>
    </message>
    <message>
      <location filename="../../CommandBody.cpp" line="120"/>
      <source>%1 already belongs to a body, can't use it as base feature for another body.</source>
      <translation>%1は既にボディーに属していて、別のボディーのベースフィーチャーとして使用できません。</translation>
    </message>
    <message>
      <location filename="../../CommandBody.cpp" line="133"/>
      <source>Base feature (%1) belongs to other part.</source>
      <translation>ベースフィーチャー (%1) は他のパーツに属しています。</translation>
    </message>
    <message>
      <location filename="../../CommandBody.cpp" line="157"/>
      <source>The selected shape consists of multiple solids.
This may lead to unexpected results.</source>
      <translation>選択されているシェイプは複数のソリッドで構成されています。これは予期しない結果につながる可能性があります。</translation>
    </message>
    <message>
      <location filename="../../CommandBody.cpp" line="161"/>
      <source>The selected shape consists of multiple shells.
This may lead to unexpected results.</source>
      <translation>選択されているシェイプは複数のシェルで構成されています。これは予期しない結果につながる可能性があります。</translation>
    </message>
    <message>
      <location filename="../../CommandBody.cpp" line="165"/>
      <source>The selected shape consists of only a shell.
This may lead to unexpected results.</source>
      <translation>選択されているシェイプはシェルひとつだけで構成されています。これは予期しない結果につながる可能性があります。</translation>
    </message>
    <message>
      <location filename="../../CommandBody.cpp" line="169"/>
      <source>The selected shape consists of multiple solids or shells.
This may lead to unexpected results.</source>
      <translation>選択されているシェイプは複数のソリッドまたはシェルで構成されています。これは予期しない結果につながる可能性があります。</translation>
    </message>
    <message>
      <location filename="../../CommandBody.cpp" line="174"/>
      <source>Base feature</source>
      <translation>ベースフィーチャー</translation>
    </message>
    <message>
      <location filename="../../CommandBody.cpp" line="182"/>
      <source>Body may be based on no more than one feature.</source>
      <translation>ボディーはベースとなるフィーチャーを1つだけ持ちます。</translation>
    </message>
    <message>
      <location filename="../../CommandBody.cpp" line="196"/>
      <source>Body</source>
      <translation>Body</translation>
    </message>
    <message>
      <location filename="../../CommandBody.cpp" line="345"/>
      <source>Nothing to migrate</source>
      <translation>移行対象がありません。</translation>
    </message>
    <message>
      <location filename="../../CommandBody.cpp" line="346"/>
      <source>No PartDesign features found that don't belong to a body. Nothing to migrate.</source>
      <translation>ボディーに属していないPartDesignの機能が見つかりませんでした。移行するものはありません。</translation>
    </message>
    <message>
      <location filename="../../CommandBody.cpp" line="494"/>
      <source>Sketch plane cannot be migrated</source>
      <translation>スケッチ平面を移行できません。</translation>
    </message>
    <message>
      <location filename="../../CommandBody.cpp" line="495"/>
      <source>Please edit '%1' and redefine it to use a Base or Datum plane as the sketch plane.</source>
      <translation>'%1'を編集してベースまたはデータム平面をスケッチ平面として使用するよう再定義してください。</translation>
    </message>
    <message>
      <location filename="../../CommandBody.cpp" line="557"/>
      <location filename="../../CommandBody.cpp" line="561"/>
      <location filename="../../CommandBody.cpp" line="566"/>
      <location filename="../../CommandBody.cpp" line="863"/>
      <location filename="../../CommandBody.cpp" line="870"/>
      <source>Selection error</source>
      <translation>選択エラー</translation>
    </message>
    <message>
      <location filename="../../CommandBody.cpp" line="558"/>
      <source>Select exactly one PartDesign feature or a body.</source>
      <translation>PartDesign フィーチャーまたはボディーを1つだけ選択してください。</translation>
    </message>
    <message>
      <location filename="../../CommandBody.cpp" line="562"/>
      <source>Couldn't determine a body for the selected feature '%s'.</source>
      <translation>選択したフィーチャー「%s」のボディーを特定できませんでした。</translation>
    </message>
    <message>
      <location filename="../../CommandBody.cpp" line="567"/>
      <source>Only a solid feature can be the tip of a body.</source>
      <translation>ボディーの先端にできるのはソリッドフィーチャーだけです。</translation>
    </message>
    <message>
      <location filename="../../CommandBody.cpp" line="689"/>
      <location filename="../../CommandBody.cpp" line="711"/>
      <location filename="../../CommandBody.cpp" line="726"/>
      <source>Features cannot be moved</source>
      <translation>フィーチャーを移動できません。</translation>
    </message>
    <message>
      <location filename="../../CommandBody.cpp" line="690"/>
      <source>Some of the selected features have dependencies in the source body</source>
      <translation>選択したフィーチャーの一部がソースボディーに依存しています。　</translation>
    </message>
    <message>
      <location filename="../../CommandBody.cpp" line="712"/>
      <source>Only features of a single source Body can be moved</source>
      <translation>動かせるのは単一ボディーに含まれるフィーチャーだけです。</translation>
    </message>
    <message>
      <location filename="../../CommandBody.cpp" line="727"/>
      <source>There are no other bodies to move to</source>
      <translation>移動先となる他のボディーがありません。</translation>
    </message>
    <message>
      <location filename="../../CommandBody.cpp" line="864"/>
      <source>Impossible to move the base feature of a body.</source>
      <translation>ボディーのベースフィーチャーを動かすことはできません。</translation>
    </message>
    <message>
      <location filename="../../CommandBody.cpp" line="871"/>
      <source>Select one or more features from the same body.</source>
      <translation>同一のボディーから1つ以上のフィーチャーを選択してください。</translation>
    </message>
    <message>
      <location filename="../../CommandBody.cpp" line="884"/>
      <source>Beginning of the body</source>
      <translation>ボディーの先頭</translation>
    </message>
    <message>
      <location filename="../../CommandBody.cpp" line="948"/>
      <source>Dependency violation</source>
      <translation>依存関係の違反</translation>
    </message>
    <message>
      <location filename="../../CommandBody.cpp" line="949"/>
      <source>Early feature must not depend on later feature.

</source>
      <translation>初期機能は後の機能に依存してはいけません。

</translation>
    </message>
    <message>
      <location filename="../../CommandPrimitive.cpp" line="263"/>
      <source>No previous feature found</source>
      <translation>前のフィーチャーが見つかりませんでした。</translation>
    </message>
    <message>
      <location filename="../../CommandPrimitive.cpp" line="264"/>
      <source>It is not possible to create a subtractive feature without a base feature available</source>
      <translation>利用可能なベースフィーチャーがない場合、減算フィーチャーは作成できません。</translation>
    </message>
    <message>
      <location filename="../../TaskTransformedParameters.cpp" line="441"/>
      <location filename="../../TaskRevolutionParameters.cpp" line="221"/>
      <source>Vertical sketch axis</source>
      <translation>垂直スケッチ軸</translation>
    </message>
    <message>
      <location filename="../../TaskTransformedParameters.cpp" line="442"/>
      <location filename="../../TaskRevolutionParameters.cpp" line="222"/>
      <source>Horizontal sketch axis</source>
      <translation>水平スケッチ軸</translation>
    </message>
    <message>
      <location filename="../../TaskRevolutionParameters.cpp" line="224"/>
      <source>Construction line %1</source>
      <translation>補助線 %1</translation>
    </message>
    <message>
      <location filename="../../TaskSketchBasedParameters.cpp" line="80"/>
      <source>Face</source>
      <translation>面</translation>
    </message>
    <message>
      <location filename="../../Utils.cpp" line="140"/>
      <source>In order to use PartDesign you need an active Body object in the document. Please make one active (double click) or create one.

If you have a legacy document with PartDesign objects without Body, use the migrate function in PartDesign to put them into a Body.</source>
      <translation>PartDesign を使用するにはドキュメント内にアクティブなボディーが必要です。どれかをアクティブにするか（ダブルクリック）、作成してください。

ボディーの無い PartDesign オブジェクトを含む古い形式のドキュメントの場合は PartDesign の移行機能を使用してそれらをボディーに配置してください。</translation>
    </message>
    <message>
      <location filename="../../Utils.cpp" line="188"/>
      <source>Active Body Required</source>
      <translation>アクティブなボディーが必要です。</translation>
    </message>
    <message>
      <location filename="../../Utils.cpp" line="189"/>
      <source>To create a new PartDesign object, there must be an active Body object in the document. Please make one active (double click) or create a new Body.</source>
      <translation>新しいPartDesignオブジェクトを作成するためにはドキュメント内にアクティブなボディーがなければなりません。どれかをアクティブにするか（ダブルクリック）、新しいボディーを作成してください。</translation>
    </message>
    <message>
      <location filename="../../Utils.cpp" line="224"/>
      <source>Feature is not in a body</source>
      <translation>フィーチャーがボディー内にありません。</translation>
    </message>
    <message>
      <location filename="../../Utils.cpp" line="225"/>
      <source>In order to use this feature it needs to belong to a body object in the document.</source>
      <translation>このフィーチャーを使用するためにはそれがドキュメント内のボディーオブジェクトに属している必要があります。</translation>
    </message>
    <message>
      <location filename="../../Utils.cpp" line="257"/>
      <source>Feature is not in a part</source>
      <translation>フィーチャーがパーツ内にありません。</translation>
    </message>
    <message>
      <location filename="../../Utils.cpp" line="258"/>
      <source>In order to use this feature it needs to belong to a part object in the document.</source>
      <translation>このフィーチャーを使用するためにはそれがドキュメント内のパーツオブジェクトに属している必要があります。</translation>
    </message>
    <message>
      <location filename="../../ViewProviderDressUp.cpp" line="50"/>
      <location filename="../../ViewProviderTransformed.cpp" line="77"/>
      <location filename="../../ViewProvider.cpp" line="64"/>
      <location filename="../../ViewProviderShapeBinder.cpp" line="210"/>
      <source>Edit %1</source>
      <translation>%1を編集</translation>
    </message>
    <message>
      <location filename="../../ViewProvider.cpp" line="77"/>
      <source>Set colors...</source>
      <translation>色を設定...</translation>
    </message>
    <message>
      <location filename="../../ViewProviderBoolean.cpp" line="63"/>
      <source>Edit boolean</source>
      <translation>ブーリアンを編集</translation>
    </message>
    <message>
      <location filename="../../ViewProviderDatum.cpp" line="114"/>
      <location filename="../../ViewProviderDatum.cpp" line="208"/>
      <source>Plane</source>
      <translation>平面</translation>
    </message>
    <message>
      <location filename="../../ViewProviderDatum.cpp" line="119"/>
      <location filename="../../ViewProviderDatum.cpp" line="204"/>
      <source>Line</source>
      <translation>線</translation>
    </message>
    <message>
      <location filename="../../ViewProviderDatum.cpp" line="124"/>
      <location filename="../../ViewProviderDatum.cpp" line="212"/>
      <source>Point</source>
      <translation>点</translation>
    </message>
    <message>
      <location filename="../../ViewProviderDatum.cpp" line="129"/>
      <source>Coordinate System</source>
      <translation>座標系</translation>
    </message>
    <message>
      <location filename="../../ViewProviderDatum.cpp" line="229"/>
      <source>Edit datum</source>
      <translation>データムを編集</translation>
    </message>
    <message>
      <location filename="../../ViewProviderDressUp.cpp" line="74"/>
      <source>Feature error</source>
      <translation>フィーチャーのエラー</translation>
    </message>
    <message>
      <location filename="../../ViewProviderDressUp.cpp" line="75"/>
      <source>%1 misses a base feature.
This feature is broken and can't be edited.</source>
      <translation>%1のベースフィーチャーが見つかりません。
このフィーチャーは壊れていて編集できません。</translation>
    </message>
    <message>
      <location filename="../../ViewProviderGroove.cpp" line="46"/>
      <source>Edit groove</source>
      <translation>グルーブを編集</translation>
    </message>
    <message>
      <location filename="../../ViewProviderHole.cpp" line="62"/>
      <source>Edit hole</source>
      <translation>ホールを編集</translation>
    </message>
    <message>
      <location filename="../../ViewProviderLoft.cpp" line="66"/>
      <source>Edit loft</source>
      <translation>ロフトを編集</translation>
    </message>
    <message>
      <location filename="../../ViewProviderPad.cpp" line="46"/>
      <source>Edit pad</source>
      <translation>パッドを編集</translation>
    </message>
    <message>
      <location filename="../../ViewProviderPipe.cpp" line="74"/>
      <source>Edit pipe</source>
      <translation>パイプを編集</translation>
    </message>
    <message>
      <location filename="../../ViewProviderPocket.cpp" line="48"/>
      <source>Edit pocket</source>
      <translation>ポケットを編集</translation>
    </message>
    <message>
      <location filename="../../ViewProviderPrimitive.cpp" line="55"/>
      <source>Edit primitive</source>
      <translation>プリミティブを編集</translation>
    </message>
    <message>
      <location filename="../../ViewProviderRevolution.cpp" line="46"/>
      <source>Edit revolution</source>
      <translation>回転押し出しを編集</translation>
    </message>
    <message>
      <location filename="../../ViewProviderShapeBinder.cpp" line="205"/>
      <source>Edit shape binder</source>
      <translation>シェイプバインダーを編集</translation>
    </message>
    <message>
      <location filename="../../ViewProviderShapeBinder.cpp" line="317"/>
      <source>Synchronize</source>
      <translation>同期する</translation>
    </message>
    <message>
      <location filename="../../ViewProviderShapeBinder.cpp" line="319"/>
      <source>Select bound object</source>
      <translation>バインドされたオブジェクトを選択</translation>
    </message>
    <message>
      <location filename="../../ViewProviderTransformed.cpp" line="175"/>
      <source>One transformed shape does not intersect the support</source>
      <translation>変換形状の1つがサポートと交差していません</translation>
    </message>
    <message>
      <location filename="../../ViewProviderTransformed.cpp" line="177"/>
      <source>%1 transformed shapes do not intersect the support</source>
      <translation>%1 つの変換形状がサポートと交差していません</translation>
    </message>
    <message>
      <location filename="../../ViewProviderTransformed.cpp" line="187"/>
      <source>Transformation succeeded</source>
      <translation>変換成功</translation>
    </message>
    <message>
      <location filename="../../WorkflowManager.cpp" line="140"/>
      <source>The document "%1" you are editing was designed with an old version of PartDesign workbench.</source>
      <translation>編集中のドキュメント「%1」は過去のバージョンの PartDesign ワークベンチでデザインされています。</translation>
    </message>
    <message>
      <location filename="../../WorkflowManager.cpp" line="143"/>
      <source>Do you want to migrate in order to use modern PartDesign features?</source>
      <translation>新しい PartDesign 機能を使用するために移行を行いますか？</translation>
    </message>
    <message>
      <location filename="../../WorkflowManager.cpp" line="146"/>
      <source>The document "%1" seems to be either in the middle of the migration process from legacy PartDesign or have a slightly broken structure.</source>
      <translation>ドキュメント「%1」は過去の PartDesign からの移行処理途中か、またはわずかに壊れた構造を含んでいます。</translation>
    </message>
    <message>
      <location filename="../../WorkflowManager.cpp" line="150"/>
      <source>Do you want to make the migration automatically?</source>
      <translation>移行を自動的に行いますか？</translation>
    </message>
    <message>
      <location filename="../../WorkflowManager.cpp" line="152"/>
      <source>Note: If you choose to migrate you won't be able to edit the file with an older FreeCAD version.
If you refuse to migrate you won't be able to use new PartDesign features like Bodies and Parts. As a result you also won't be able to use your parts in the assembly workbench.
Although you will be able to migrate any moment later with 'Part Design -&gt; Migrate'.</source>
      <translation>移行を選択した場合、このファイルは過去のバージョンのFreeCADで編集できなくなることに注意してください。移行しない場合、ボディーやパーツといった新しい PartDesign 機能は使用できず、作成した部品をアセンブリワークベンチで使用することもできません。「パートデザイン-移行...」を選択することで移行はいつでも行えます。</translation>
    </message>
    <message>
      <location filename="../../WorkflowManager.cpp" line="161"/>
      <source>Migrate manually</source>
      <translation>手動で移行</translation>
    </message>
    <message>
      <location filename="../../ViewProviderHelix.cpp" line="51"/>
      <source>Edit helix</source>
      <translation>らせんを編集</translation>
    </message>
    <message>
      <location filename="../../ViewProviderChamfer.cpp" line="41"/>
      <source>Edit chamfer</source>
      <translation>面取りを編集</translation>
    </message>
    <message>
      <location filename="../../ViewProviderDraft.cpp" line="42"/>
      <source>Edit draft</source>
      <translation>抜き勾配を編集</translation>
    </message>
    <message>
      <location filename="../../ViewProviderFillet.cpp" line="41"/>
      <source>Edit fillet</source>
      <translation>フィレットを編集</translation>
    </message>
    <message>
      <location filename="../../ViewProviderLinearPattern.cpp" line="39"/>
      <source>Edit linear pattern</source>
      <translation>直線状パターンを編集</translation>
    </message>
    <message>
      <location filename="../../ViewProviderMirrored.cpp" line="39"/>
      <source>Edit mirrored</source>
      <translation>鏡像を編集</translation>
    </message>
    <message>
      <location filename="../../ViewProviderMultiTransform.cpp" line="48"/>
      <source>Edit multi-transform</source>
      <translation>マルチ変換を編集</translation>
    </message>
    <message>
      <location filename="../../ViewProviderPolarPattern.cpp" line="38"/>
      <source>Edit polar pattern</source>
      <translation>円状パターンを編集</translation>
    </message>
    <message>
      <location filename="../../ViewProviderScaled.cpp" line="39"/>
      <source>Edit scaled</source>
      <translation>拡大縮小を編集</translation>
    </message>
    <message>
      <location filename="../../ViewProviderThickness.cpp" line="41"/>
      <source>Edit thickness</source>
      <translation>厚さを編集</translation>
    </message>
  </context>
  <context>
    <name>SprocketParameter</name>
    <message>
      <location filename="../../../SprocketFeature.ui" line="14"/>
      <source>Sprocket parameters</source>
      <translation>スプロケットパラメーター</translation>
    </message>
    <message>
      <location filename="../../../SprocketFeature.ui" line="26"/>
      <source>Number of teeth:</source>
      <translation>歯数:</translation>
    </message>
    <message>
      <location filename="../../../SprocketFeature.ui" line="52"/>
      <source>Sprocket Reference</source>
      <translation>スプロケットリファレンス</translation>
    </message>
    <message>
      <location filename="../../../SprocketFeature.ui" line="66"/>
      <source>ANSI 25</source>
      <translation>ANSI 25</translation>
    </message>
    <message>
      <location filename="../../../SprocketFeature.ui" line="71"/>
      <source>ANSI 35</source>
      <translation>ANSI 35</translation>
    </message>
    <message>
      <location filename="../../../SprocketFeature.ui" line="76"/>
      <source>ANSI 41</source>
      <translation>ANSI 41</translation>
    </message>
    <message>
      <location filename="../../../SprocketFeature.ui" line="81"/>
      <source>ANSI 40</source>
      <translation>ANSI 40</translation>
    </message>
    <message>
      <location filename="../../../SprocketFeature.ui" line="86"/>
      <source>ANSI 50</source>
      <translation>ANSI 50</translation>
    </message>
    <message>
      <location filename="../../../SprocketFeature.ui" line="91"/>
      <source>ANSI 60</source>
      <translation>ANSI 60</translation>
    </message>
    <message>
      <location filename="../../../SprocketFeature.ui" line="96"/>
      <source>ANSI 80</source>
      <translation>ANSI 80</translation>
    </message>
    <message>
      <location filename="../../../SprocketFeature.ui" line="101"/>
      <source>ANSI 100</source>
      <translation>ANSI 100</translation>
    </message>
    <message>
      <location filename="../../../SprocketFeature.ui" line="106"/>
      <source>ANSI 120</source>
      <translation>ANSI 120</translation>
    </message>
    <message>
      <location filename="../../../SprocketFeature.ui" line="111"/>
      <source>ANSI 140</source>
      <translation>ANSI 140</translation>
    </message>
    <message>
      <location filename="../../../SprocketFeature.ui" line="116"/>
      <source>ANSI 160</source>
      <translation>ANSI 160</translation>
    </message>
    <message>
      <location filename="../../../SprocketFeature.ui" line="121"/>
      <source>ANSI 180</source>
      <translation>ANSI 180</translation>
    </message>
    <message>
      <location filename="../../../SprocketFeature.ui" line="126"/>
      <source>ANSI 200</source>
      <translation>ANSI 200</translation>
    </message>
    <message>
      <location filename="../../../SprocketFeature.ui" line="131"/>
      <source>ANSI 240</source>
      <translation>ANSI 240</translation>
    </message>
    <message>
      <location filename="../../../SprocketFeature.ui" line="136"/>
      <source>Bicycle with Derailleur</source>
      <translation>変速機付き自転車</translation>
    </message>
    <message>
      <location filename="../../../SprocketFeature.ui" line="141"/>
      <source>Bicycle without Derailleur</source>
      <translation>変速機なし自転車</translation>
    </message>
    <message>
      <location filename="../../../SprocketFeature.ui" line="146"/>
      <source>ISO 606 06B</source>
      <translation>ISO 606 06B</translation>
    </message>
    <message>
      <location filename="../../../SprocketFeature.ui" line="151"/>
      <source>ISO 606 08B</source>
      <translation>ISO 606 08B</translation>
    </message>
    <message>
      <location filename="../../../SprocketFeature.ui" line="156"/>
      <source>ISO 606 10B</source>
      <translation>ISO 606 10B</translation>
    </message>
    <message>
      <location filename="../../../SprocketFeature.ui" line="161"/>
      <source>ISO 606 12B</source>
      <translation>ISO 606 12B</translation>
    </message>
    <message>
      <location filename="../../../SprocketFeature.ui" line="166"/>
      <source>ISO 606 16B</source>
      <translation>ISO 606 16B</translation>
    </message>
    <message>
      <location filename="../../../SprocketFeature.ui" line="171"/>
      <source>ISO 606 20B</source>
      <translation>ISO 606 20B</translation>
    </message>
    <message>
      <location filename="../../../SprocketFeature.ui" line="176"/>
      <source>ISO 606 24B</source>
      <translation>ISO 606 24B</translation>
    </message>
    <message>
      <location filename="../../../SprocketFeature.ui" line="181"/>
      <source>Motorcycle 420</source>
      <translation>オートバイ 420</translation>
    </message>
    <message>
      <location filename="../../../SprocketFeature.ui" line="186"/>
      <source>Motorcycle 425</source>
      <translation>オートバイ 425</translation>
    </message>
    <message>
      <location filename="../../../SprocketFeature.ui" line="191"/>
      <source>Motorcycle 428</source>
      <translation>オートバイ 428</translation>
    </message>
    <message>
      <location filename="../../../SprocketFeature.ui" line="196"/>
      <source>Motorcycle 520</source>
      <translation>オートバイ 520</translation>
    </message>
    <message>
      <location filename="../../../SprocketFeature.ui" line="201"/>
      <source>Motorcycle 525</source>
      <translation>オートバイ 525</translation>
    </message>
    <message>
      <location filename="../../../SprocketFeature.ui" line="206"/>
      <source>Motorcycle 530</source>
      <translation>オートバイ 530</translation>
    </message>
    <message>
      <location filename="../../../SprocketFeature.ui" line="211"/>
      <source>Motorcycle 630</source>
      <translation>オートバイ 630</translation>
    </message>
    <message>
      <location filename="../../../SprocketFeature.ui" line="219"/>
      <source>Chain Pitch:</source>
      <translation>チェーンピッチ:</translation>
    </message>
    <message>
      <location filename="../../../SprocketFeature.ui" line="238"/>
      <source>0 in</source>
      <translation>0 in</translation>
    </message>
    <message>
      <location filename="../../../SprocketFeature.ui" line="266"/>
      <source>Chain Roller Diameter:</source>
      <translation>チェーンローラーの直径:</translation>
    </message>
    <message>
      <location filename="../../../SprocketFeature.ui" line="310"/>
      <source>Tooth Width:</source>
      <translation>歯の幅:</translation>
    </message>
  </context>
  <context>
    <name>TaskHoleParameters</name>
    <message>
      <location filename="../../TaskHoleParameters.ui" line="20"/>
      <source>Task Hole Parameters</source>
      <translation>タスクホールパラメーター</translation>
    </message>
    <message>
      <location filename="../../TaskHoleParameters.ui" line="675"/>
      <source>Whether the hole gets a thread</source>
      <translation>ねじ穴にするかどうか</translation>
    </message>
    <message>
      <location filename="../../TaskHoleParameters.ui" line="678"/>
      <source>Threaded</source>
      <translation>ねじ</translation>
    </message>
    <message>
      <location filename="../../TaskHoleParameters.ui" line="896"/>
      <source>Whether the hole gets a modelled thread</source>
      <translation>モデル化されたねじ穴にするかどうか</translation>
    </message>
    <message>
      <location filename="../../TaskHoleParameters.ui" line="899"/>
      <source>Model Thread</source>
      <translation>モデル ねじ山</translation>
    </message>
    <message>
      <location filename="../../TaskHoleParameters.ui" line="915"/>
      <source>Live update of changes to the thread
Note that the calculation can take some time</source>
      <translation>ねじ山の変更を即時更新
計算に時間がかかる場合があるので注意</translation>
    </message>
    <message>
      <location filename="../../TaskHoleParameters.ui" line="1012"/>
      <source>Thread Depth</source>
      <translation type="unfinished">Thread Depth</translation>
    </message>
    <message>
      <location filename="../../TaskHoleParameters.ui" line="1065"/>
      <source>Customize thread clearance</source>
      <translation>ねじ山の間隔をカスタマイズ</translation>
    </message>
    <message>
      <location filename="../../TaskHoleParameters.ui" line="712"/>
      <source>Clearance</source>
      <translation>クリアランス</translation>
    </message>
    <message>
      <location filename="../../TaskHoleParameters.ui" line="919"/>
      <source>Update thread view</source>
      <translation>ネジ山の表示を更新</translation>
    </message>
    <message>
      <location filename="../../TaskHoleParameters.ui" line="1071"/>
      <source>Custom Clearance</source>
      <translation>カスタムクリアランス</translation>
    </message>
    <message>
      <location filename="../../TaskHoleParameters.ui" line="1084"/>
      <source>Custom Thread clearance value</source>
      <translation>カスタム ねじ山間隔値</translation>
    </message>
    <message>
      <location filename="../../TaskHoleParameters.ui" line="828"/>
      <source>Direction</source>
      <translation>方向</translation>
    </message>
    <message>
      <location filename="../../TaskHoleParameters.ui" line="660"/>
      <source>Size</source>
      <translation>サイズ</translation>
    </message>
    <message>
      <location filename="../../TaskHoleParameters.ui" line="725"/>
      <source>Hole clearance
Only available for holes without thread</source>
      <translation>ホールクリアランス
ねじ山のない穴のみ利用可能</translation>
    </message>
    <message>
      <location filename="../../TaskHoleParameters.ui" line="637"/>
      <location filename="../../TaskHoleParameters.ui" line="730"/>
      <source>Standard</source>
      <translation>標準</translation>
    </message>
    <message>
      <location filename="../../TaskHoleParameters.ui" line="735"/>
      <source>Close</source>
      <translation>閉じる</translation>
    </message>
    <message>
      <location filename="../../TaskHoleParameters.ui" line="740"/>
      <source>Wide</source>
      <translation>幅</translation>
    </message>
    <message>
      <location filename="../../TaskHoleParameters.ui" line="808"/>
      <source>Class</source>
      <translation>クラス</translation>
    </message>
    <message>
      <location filename="../../TaskHoleParameters.ui" line="795"/>
      <source>Tolerance class for threaded holes according to hole profile</source>
      <translation>穴用プロファイルに従ったねじ穴の公差等級</translation>
    </message>
    <message>
      <location filename="../../TaskHoleParameters.ui" line="506"/>
      <source>Diameter</source>
      <translation>直径</translation>
    </message>
    <message>
      <location filename="../../TaskHoleParameters.ui" line="528"/>
      <source>Hole diameter</source>
      <translation>穴の直径</translation>
    </message>
    <message>
      <location filename="../../TaskHoleParameters.ui" line="461"/>
      <source>Depth</source>
      <translation>深さ</translation>
    </message>
    <message>
      <location filename="../../TaskHoleParameters.ui" line="43"/>
      <source>Base profile types</source>
      <translation type="unfinished">Base profile types</translation>
    </message>
    <message>
      <location filename="../../TaskHoleParameters.ui" line="51"/>
      <source>Circles and arcs</source>
      <translation type="unfinished">Circles and arcs</translation>
    </message>
    <message>
      <location filename="../../TaskHoleParameters.ui" line="56"/>
      <source>Points, circles and arcs</source>
      <translation type="unfinished">Points, circles and arcs</translation>
    </message>
    <message>
      <location filename="../../TaskHoleParameters.ui" line="61"/>
      <source>Points</source>
      <translation>点群</translation>
    </message>
    <message>
      <location filename="../../TaskHoleParameters.ui" line="78"/>
      <source>Head Type</source>
      <translation type="unfinished">Head Type</translation>
    </message>
    <message>
      <location filename="../../TaskHoleParameters.ui" line="95"/>
      <location filename="../../TaskHoleParameters.ui" line="982"/>
      <source>Dimension</source>
      <translation>寸法</translation>
    </message>
    <message>
      <location filename="../../TaskHoleParameters.ui" line="100"/>
      <source>Through all</source>
      <translation>貫通</translation>
    </message>
    <message>
      <location filename="../../TaskHoleParameters.ui" line="117"/>
      <source>Depth Type</source>
      <translation type="unfinished">Depth Type</translation>
    </message>
    <message>
      <location filename="../../TaskHoleParameters.ui" line="151"/>
      <source>Custom head values</source>
      <translation type="unfinished">Custom head values</translation>
    </message>
    <message>
      <location filename="../../TaskHoleParameters.ui" line="199"/>
      <source>Head Diameter</source>
      <translation type="unfinished">Head Diameter</translation>
    </message>
    <message>
      <location filename="../../TaskHoleParameters.ui" line="247"/>
      <source>Head Depth</source>
      <translation type="unfinished">Head Depth</translation>
    </message>
    <message>
      <location filename="../../TaskHoleParameters.ui" line="321"/>
      <source>Drill angle</source>
      <extracomment>Translate it as short as possible</extracomment>
      <translation type="unfinished">Drill angle</translation>
    </message>
    <message>
      <location filename="../../TaskHoleParameters.ui" line="357"/>
      <source>Include in depth</source>
      <extracomment>Translate it as short as possible</extracomment>
      <translation type="unfinished">Include in depth</translation>
    </message>
    <message>
      <location filename="../../TaskHoleParameters.ui" line="564"/>
      <source>Switch direction</source>
      <translation type="unfinished">Switch direction</translation>
    </message>
    <message>
      <location filename="../../TaskHoleParameters.ui" line="852"/>
      <source>&amp;Right hand</source>
      <translation type="unfinished">&amp;Right hand</translation>
    </message>
    <message>
      <location filename="../../TaskHoleParameters.ui" line="868"/>
      <source>&amp;Left hand</source>
      <translation type="unfinished">&amp;Left hand</translation>
    </message>
    <message>
      <location filename="../../TaskHoleParameters.ui" line="963"/>
      <source>Thread Depth Type</source>
      <translation type="unfinished">Thread Depth Type</translation>
    </message>
    <message>
      <location filename="../../TaskHoleParameters.ui" line="977"/>
      <source>Hole depth</source>
      <translation>穴の深さ</translation>
    </message>
    <message>
      <location filename="../../TaskHoleParameters.ui" line="987"/>
      <source>Tapped (DIN76)</source>
      <translation>タップ (DIN76)</translation>
    </message>
    <message>
      <location filename="../../TaskHoleParameters.ui" line="130"/>
      <source>Cut type for screw heads</source>
      <translation>ネジ頭のカットタイプ</translation>
    </message>
    <message>
      <location filename="../../TaskHoleParameters.ui" line="145"/>
      <source>Check to override the values predefined by the 'Type'</source>
      <translation>「タイプ」で定義された値を上書きする場合はチェック</translation>
    </message>
    <message>
      <location filename="../../TaskHoleParameters.ui" line="260"/>
      <source>For countersinks this is the depth of
the screw's top below the surface</source>
      <translation>皿穴の場合、面の下のねじ上部の深さです。</translation>
    </message>
    <message>
      <location filename="../../TaskHoleParameters.ui" line="416"/>
      <source>Countersink angle</source>
      <translation>皿穴の角度</translation>
    </message>
    <message>
      <location filename="../../TaskHoleParameters.ui" line="353"/>
      <source>The size of the drill point will be taken into
account for the depth of blind holes</source>
      <translation>止まり穴の深さでは錐先の大きさが考慮されます。</translation>
    </message>
    <message>
      <location filename="../../TaskHoleParameters.ui" line="580"/>
      <source>Tapered</source>
      <translation>テーパー</translation>
    </message>
    <message>
      <location filename="../../TaskHoleParameters.ui" line="593"/>
      <source>Taper angle for the hole
90 degree: straight hole
under 90: smaller hole radius at the bottom
over 90: larger hole radius at the bottom</source>
      <translation>穴のテーパー角度
90 度: 垂直穴
90度未満: 底部の穴半径が小
90度超: 底部の穴半径が大</translation>
    </message>
    <message>
      <location filename="../../TaskHoleParameters.ui" line="561"/>
      <source>Reverses the hole direction</source>
      <translation>穴の方向を反転</translation>
    </message>
  </context>
  <context>
    <name>TaskTransformedMessages</name>
    <message>
      <location filename="../../TaskTransformedMessages.ui" line="25"/>
      <source>No message</source>
      <translation>メッセージなし</translation>
    </message>
  </context>
  <context>
    <name>Workbench</name>
    <message>
      <location filename="../../Workbench.cpp" line="43"/>
      <source>&amp;Sketch</source>
      <translation>スケッチ(&amp;S)</translation>
    </message>
    <message>
      <location filename="../../Workbench.cpp" line="45"/>
      <source>&amp;Part Design</source>
      <translation>パートデザイン(&amp;P)</translation>
    </message>
    <message>
      <location filename="../../Workbench.cpp" line="46"/>
      <source>Create a datum</source>
      <translation>データムを作成</translation>
    </message>
    <message>
      <location filename="../../Workbench.cpp" line="47"/>
      <source>Create an additive feature</source>
      <translation>加算フィーチャーを作成</translation>
    </message>
    <message>
      <location filename="../../Workbench.cpp" line="48"/>
      <source>Create a subtractive feature</source>
      <translation>減算フィーチャーを作成</translation>
    </message>
    <message>
      <location filename="../../Workbench.cpp" line="49"/>
      <source>Apply a pattern</source>
      <translation>パターンを適用</translation>
    </message>
    <message>
      <location filename="../../Workbench.cpp" line="50"/>
      <source>Apply a dress-up feature</source>
      <translation>ドレスアップフィーチャーを適用</translation>
    </message>
    <message>
      <location filename="../../Workbench.cpp" line="51"/>
      <source>Sprocket...</source>
      <translation>スプロケット...</translation>
    </message>
    <message>
      <location filename="../../Workbench.cpp" line="52"/>
      <source>Involute gear...</source>
      <translation>インボリュート歯車...</translation>
    </message>
    <message>
      <location filename="../../Workbench.cpp" line="53"/>
      <source>Shaft design wizard</source>
      <translation>シャフト設計ウィザード</translation>
    </message>
    <message>
      <location filename="../../Workbench.cpp" line="61"/>
      <source>Measure</source>
      <translation>測定</translation>
    </message>
    <message>
      <location filename="../../Workbench.cpp" line="62"/>
      <source>Refresh</source>
      <translation>更新</translation>
    </message>
    <message>
      <location filename="../../Workbench.cpp" line="63"/>
      <source>Toggle 3D</source>
      <translation>3D の切り替え</translation>
    </message>
    <message>
      <location filename="../../Workbench.cpp" line="64"/>
      <source>Part Design Helper</source>
      <translation>Part Design ヘルパー</translation>
    </message>
    <message>
      <location filename="../../Workbench.cpp" line="65"/>
      <source>Part Design Modeling</source>
      <translation>Part Design モデリング</translation>
    </message>
  </context>
  <context>
    <name>PartDesign_InvoluteGear</name>
    <message>
      <location filename="../../../InvoluteGearFeature.py" line="58"/>
      <source>Involute gear...</source>
      <translation>インボリュート歯車...</translation>
    </message>
    <message>
      <location filename="../../../InvoluteGearFeature.py" line="62"/>
      <source>Creates or edit the involute gear definition.</source>
      <translation>インボリュート歯車定義の作成、または編集</translation>
    </message>
  </context>
  <context>
    <name>PartDesign_Sprocket</name>
    <message>
      <location filename="../../../SprocketFeature.py" line="62"/>
      <source>Sprocket...</source>
      <translation>スプロケット...</translation>
    </message>
    <message>
      <location filename="../../../SprocketFeature.py" line="66"/>
      <source>Creates or edit the sprocket definition.</source>
      <translation>スプロケット定義の作成、または編集</translation>
    </message>
  </context>
  <context>
    <name>WizardShaftTable</name>
    <message>
      <location filename="../../../WizardShaft/WizardShaftTable.py" line="45"/>
      <source>Length [mm]</source>
      <translation>長さ [mm]</translation>
    </message>
    <message>
      <location filename="../../../WizardShaft/WizardShaftTable.py" line="46"/>
      <source>Diameter [mm]</source>
      <translation>直径 [mm]</translation>
    </message>
    <message>
      <location filename="../../../WizardShaft/WizardShaftTable.py" line="47"/>
      <source>Inner diameter [mm]</source>
      <translation>内径 [mm]</translation>
    </message>
    <message>
      <location filename="../../../WizardShaft/WizardShaftTable.py" line="48"/>
      <source>Constraint type</source>
      <translation>拘束タイプ</translation>
    </message>
    <message>
      <location filename="../../../WizardShaft/WizardShaftTable.py" line="49"/>
      <source>Start edge type</source>
      <translation>エッジ始端タイプ</translation>
    </message>
    <message>
      <location filename="../../../WizardShaft/WizardShaftTable.py" line="50"/>
      <source>Start edge size</source>
      <translation>エッジ始端サイズ</translation>
    </message>
    <message>
      <location filename="../../../WizardShaft/WizardShaftTable.py" line="51"/>
      <source>End edge type</source>
      <translation>エッジ終端タイプ</translation>
    </message>
    <message>
      <location filename="../../../WizardShaft/WizardShaftTable.py" line="55"/>
      <source>End edge size</source>
      <translation>エッジ終端サイズ</translation>
    </message>
    <message>
      <location filename="../../../WizardShaft/WizardShaftTable.py" line="64"/>
      <source>Shaft wizard</source>
      <translation>シャフトウィザード</translation>
    </message>
    <message>
      <location filename="../../../WizardShaft/WizardShaftTable.py" line="72"/>
      <source>Section 1</source>
      <translation>セクション 1</translation>
    </message>
    <message>
      <location filename="../../../WizardShaft/WizardShaftTable.py" line="72"/>
      <source>Section 2</source>
      <translation>セクション 2</translation>
    </message>
    <message>
      <location filename="../../../WizardShaft/WizardShaftTable.py" line="76"/>
      <source>Add column</source>
      <translation>列を追加</translation>
    </message>
    <message>
      <location filename="../../../WizardShaft/WizardShaftTable.py" line="122"/>
      <source>Section %s</source>
      <translation>セクション %s</translation>
    </message>
    <message>
      <location filename="../../../WizardShaft/WizardShaftTable.py" line="150"/>
      <location filename="../../../WizardShaft/WizardShaftTable.py" line="165"/>
      <source>None</source>
      <translation>なし</translation>
    </message>
    <message>
      <location filename="../../../WizardShaft/WizardShaftTable.py" line="151"/>
      <source>Fixed</source>
      <translation>固定</translation>
    </message>
    <message>
      <location filename="../../../WizardShaft/WizardShaftTable.py" line="152"/>
      <source>Force</source>
      <translation>加力</translation>
    </message>
    <message>
      <location filename="../../../WizardShaft/WizardShaftTable.py" line="153"/>
      <source>Bearing</source>
      <translation>ベアリング</translation>
    </message>
    <message>
      <location filename="../../../WizardShaft/WizardShaftTable.py" line="154"/>
      <source>Gear</source>
      <translation>ギア</translation>
    </message>
    <message>
      <location filename="../../../WizardShaft/WizardShaftTable.py" line="155"/>
      <source>Pulley</source>
      <translation>プーリー</translation>
    </message>
    <message>
      <location filename="../../../WizardShaft/WizardShaftTable.py" line="166"/>
      <source>Chamfer</source>
      <translation>面取り</translation>
    </message>
    <message>
      <location filename="../../../WizardShaft/WizardShaftTable.py" line="167"/>
      <source>Fillet</source>
      <translation>フィレット</translation>
    </message>
  </context>
  <context>
    <name>TaskWizardShaft</name>
    <message>
      <location filename="../../../WizardShaft/WizardShaft.py" line="57"/>
      <source>All</source>
      <translation>すべて</translation>
    </message>
    <message>
      <location filename="../../../WizardShaft/WizardShaft.py" line="104"/>
      <source>Missing module</source>
      <translation>モジュールが見つかりません。</translation>
    </message>
    <message>
      <location filename="../../../WizardShaft/WizardShaft.py" line="105"/>
      <source>You may have to install the Plot add-on</source>
      <translation>Plotアドオンをインストールする必要があるかもしれません。</translation>
    </message>
  </context>
  <context>
    <name>PartDesign_WizardShaft</name>
    <message>
      <location filename="../../../WizardShaft/WizardShaft.py" line="189"/>
      <source>Shaft design wizard...</source>
      <translation>シャフト設計ウィザード...</translation>
    </message>
    <message>
      <location filename="../../../WizardShaft/WizardShaft.py" line="190"/>
      <source>Start the shaft design wizard</source>
      <translation>シャフト設計ウィザードを開始</translation>
    </message>
  </context>
  <context>
    <name>PartDesign_WizardShaftCallBack</name>
    <message>
      <location filename="../../../WizardShaft/WizardShaft.py" line="214"/>
      <source>Shaft design wizard...</source>
      <translation>シャフト設計ウィザード...</translation>
    </message>
    <message>
      <location filename="../../../WizardShaft/WizardShaft.py" line="215"/>
      <source>Start the shaft design wizard</source>
      <translation>シャフト設計ウィザードを開始</translation>
    </message>
  </context>
  <context>
    <name>Exception</name>
    <message>
      <location filename="../../../App/Body.cpp" line="403"/>
      <source>Linked object is not a PartDesign feature</source>
      <translation>リンクされたオブジェクトはパートデザインのフィーチャーではありません。</translation>
    </message>
    <message>
      <location filename="../../../App/Body.cpp" line="410"/>
      <source>Tip shape is empty</source>
      <translation>最終結果のシェイプが空です。</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureBase.cpp" line="64"/>
      <source>BaseFeature link is not set</source>
      <translation>BaseFeatureリンクが設定されていません。</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureBase.cpp" line="69"/>
      <source>BaseFeature must be a Part::Feature</source>
      <translation>BaseFeatureはPart::Featureでなければなりません。</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureBase.cpp" line="78"/>
      <source>BaseFeature has an empty shape</source>
      <translation>BaseFeatureに空のシェイプがあります。</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureBoolean.cpp" line="78"/>
      <source>Cannot do boolean cut without BaseFeature</source>
      <translation>BaseFeatureなしでブーリアン演算のカットを行うことはできません。</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureBoolean.cpp" line="92"/>
      <location filename="../../../App/FeatureBoolean.cpp" line="121"/>
      <source>Cannot do boolean with anything but Part::Feature and its derivatives</source>
      <translation>Part::Featureとその派生物以外ではブーリアン演算を行うことはできません。</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureBoolean.cpp" line="99"/>
      <source>Cannot do boolean operation with invalid base shape</source>
      <translation>無効なベースシェイプではブーリアン演算を行うことはできません。</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureBoolean.cpp" line="105"/>
      <source>Cannot do boolean on feature which is not in a body</source>
      <translation>ボディー内にないフィーチャーではブーリアン演算を行うことはできません。</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureBoolean.cpp" line="131"/>
      <source>Base shape is null</source>
      <translation>ベースシェイプが null です。</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureBoolean.cpp" line="112"/>
      <location filename="../../../App/FeatureBoolean.cpp" line="134"/>
      <source>Tool shape is null</source>
      <translation>ツールシェイプが null です。</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureBoolean.cpp" line="150"/>
      <source>Unsupported boolean operation</source>
      <translation>サポートされていないブーリアン演算です。</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureExtrude.cpp" line="807"/>
      <location filename="../../../App/FeaturePipe.cpp" line="401"/>
      <location filename="../../../App/FeaturePipe.cpp" line="423"/>
      <location filename="../../../App/FeatureLoft.cpp" line="264"/>
      <location filename="../../../App/FeaturePrimitive.cpp" line="130"/>
      <source>Resulting shape is not a solid</source>
      <translation>結果シェイプはソリッドではありません。</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureExtrude.cpp" line="815"/>
      <location filename="../../../App/FeatureExtrude.cpp" line="829"/>
      <location filename="../../../App/FeatureExtrude.cpp" line="838"/>
      <location filename="../../../App/FeatureChamfer.cpp" line="178"/>
      <location filename="../../../App/FeaturePipe.cpp" line="405"/>
      <location filename="../../../App/FeaturePipe.cpp" line="427"/>
      <location filename="../../../App/FeatureDraft.cpp" line="322"/>
      <location filename="../../../App/FeatureBoolean.cpp" line="163"/>
      <location filename="../../../App/FeatureFillet.cpp" line="123"/>
      <location filename="../../../App/FeatureLoft.cpp" line="271"/>
      <location filename="../../../App/FeatureHole.cpp" line="2150"/>
      <location filename="../../../App/FeatureGroove.cpp" line="197"/>
      <source>Result has multiple solids: that is not currently supported.</source>
      <translation>結果に複数のソリッドが含まれています。これは現在サポートされていません。</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureChamfer.cpp" line="157"/>
      <source>Failed to create chamfer</source>
      <translation>面取りを作成できませんでした。</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureDraft.cpp" line="319"/>
      <location filename="../../../App/FeatureFillet.cpp" line="102"/>
      <source>Resulting shape is null</source>
      <translation>結果シェイプが null です。</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureChamfer.cpp" line="183"/>
      <source>Resulting shape is invalid</source>
      <translation>結果シェイプが無効です。</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureChamfer.cpp" line="128"/>
      <source>No edges specified</source>
      <translation>エッジが指定されていません。</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureChamfer.cpp" line="247"/>
      <source>Size must be greater than zero</source>
      <translation>サイズはゼロより大きくなければなりません。</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureChamfer.cpp" line="256"/>
      <source>Size2 must be greater than zero</source>
      <translation>サイズ2はゼロより大きくなければなりません。</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureChamfer.cpp" line="261"/>
      <source>Angle must be greater than 0 and less than 180</source>
      <translation>角度は0から180の間でなければなりません。</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureDraft.cpp" line="315"/>
      <source>Failed to create draft</source>
      <translation>抜き勾配を作成できませんでした。</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureFillet.cpp" line="85"/>
      <source>Fillet not possible on selected shapes</source>
      <translation>選択したシェイプではフィレットを作成できません。</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureFillet.cpp" line="92"/>
      <source>Fillet radius must be greater than zero</source>
      <translation>フィレット半径は0より大きくなければなりません。</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureGroove.cpp" line="89"/>
      <source>Angle of groove too large</source>
      <translation>グルーブの角度が大きすぎます。</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureGroove.cpp" line="93"/>
      <source>Angle of groove too small</source>
      <translation>グルーブの角度が小さすぎます。</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureHole.cpp" line="1870"/>
      <location filename="../../../App/FeatureGroove.cpp" line="112"/>
      <source>The requested feature cannot be created. The reason may be that:
  - the active Body does not contain a base shape, so there is no
  material to be removed;
  - the selected sketch does not belong to the active Body.</source>
      <translation>要求されたフィーチャーを作成できません。原因は以下である可能性があります。
・ アクティブなボディーにベースシェイプが無く、削除されるマテリアルが存在しない。
・ 選択されたスケッチがアクティブなボディーに属していない。</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureExtrude.cpp" line="487"/>
      <source>Length too small</source>
      <translation>長さが小さすぎます。</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureExtrude.cpp" line="494"/>
      <source>Second length too small</source>
      <translation>2番目の長さが小さすぎます。</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureExtrude.cpp" line="533"/>
      <source>Failed to obtain profile shape</source>
      <translation>プロファイルのシェイプを取得できませんでした。</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureExtrude.cpp" line="585"/>
      <source>Creation failed because direction is orthogonal to sketch's normal vector</source>
      <translation>方向とスケッチの法線ベクトルが直交しているため作成に失敗しました。</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureExtrude.cpp" line="643"/>
      <source>Extrude: Can only offset one face</source>
      <translation>押し出し: 1つの面のみオフセット可能</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureRevolution.cpp" line="136"/>
      <location filename="../../../App/FeatureExtrude.cpp" line="604"/>
      <location filename="../../../App/FeatureGroove.cpp" line="129"/>
      <source>Creating a face from sketch failed</source>
      <translation>スケッチから面を作成できませんでした。</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureExtrude.cpp" line="686"/>
      <source>Up to face: Could not get SubShape!</source>
      <translation>面まで: サブシェイプが得られませんでした!</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureExtrude.cpp" line="717"/>
      <source>Unable to reach the selected shape, please select faces</source>
      <translation>選択したシェイプに到達できません。面を選択してください。</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureExtrude.cpp" line="746"/>
      <source>Magnitude of taper angle matches or exceeds 90 degrees</source>
      <translation>テーパー角度の大きさが一致しているか、または90度を超えています。</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureExtrude.cpp" line="757"/>
      <source>Padding with draft angle failed</source>
      <translation>抜き勾配角度でのパディングが失敗しました。</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureRevolution.cpp" line="154"/>
      <location filename="../../../App/FeatureGroove.cpp" line="151"/>
      <source>Revolve axis intersects the sketch</source>
      <translation>回転押し出しの軸がスケッチと交差しています。</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureRevolution.cpp" line="235"/>
      <location filename="../../../App/FeatureGroove.cpp" line="159"/>
      <source>Could not revolve the sketch!</source>
      <translation>スケッチを回転押し出しできませんでした!</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureRevolution.cpp" line="247"/>
      <location filename="../../../App/FeatureGroove.cpp" line="205"/>
      <source>Could not create face from sketch.
Intersecting sketch entities in a sketch are not allowed.</source>
      <translation>スケッチから面を作成できませんでした。
スケッチ内のスケッチ図形を交差させることはできません。</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureHelix.cpp" line="136"/>
      <source>Error: Pitch too small!</source>
      <translation>エラー：ピッチが小さすぎます！</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureHelix.cpp" line="138"/>
      <location filename="../../../App/FeatureHelix.cpp" line="152"/>
      <source>Error: height too small!</source>
      <translation>エラー：高さが小さすぎます！</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureHelix.cpp" line="144"/>
      <source>Error: pitch too small!</source>
      <translation>エラー：ピッチが小さすぎます！</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureHelix.cpp" line="146"/>
      <location filename="../../../App/FeatureHelix.cpp" line="154"/>
      <location filename="../../../App/FeatureHelix.cpp" line="160"/>
      <source>Error: turns too small!</source>
      <translation>エラー: 巻数が小さすぎます！</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureHelix.cpp" line="164"/>
      <source>Error: either height or growth must not be zero!</source>
      <translation>エラー: 高さと増加率のいずれかをゼロにすることはできません！</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureHelix.cpp" line="178"/>
      <source>Error: unsupported mode</source>
      <translation>エラー: サポートされていないモードです。</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureHelix.cpp" line="190"/>
      <source>Error: No valid sketch or face</source>
      <translation>エラー: 有効なスケッチ、面がありません。</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureHelix.cpp" line="199"/>
      <source>Error: Face must be planar</source>
      <translation>エラー: 面は平面でなければなりません。</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureHole.cpp" line="2472"/>
      <location filename="../../../App/FeatureHelix.cpp" line="291"/>
      <location filename="../../../App/FeatureHelix.cpp" line="323"/>
      <source>Error: Result is not a solid</source>
      <translation>エラー: 結果はソリッドではありません。</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureHelix.cpp" line="267"/>
      <source>Error: There is nothing to subtract</source>
      <translation>エラー: 減算の対象がありません。</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureHelix.cpp" line="271"/>
      <location filename="../../../App/FeatureHelix.cpp" line="295"/>
      <location filename="../../../App/FeatureHelix.cpp" line="326"/>
      <source>Error: Result has multiple solids</source>
      <translation>エラー: 結果に複数のソリッドが存在します。</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureHelix.cpp" line="284"/>
      <source>Error: Adding the helix failed</source>
      <translation>エラー: らせんの加算に失敗しました。</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureHelix.cpp" line="310"/>
      <source>Error: Intersecting the helix failed</source>
      <translation>エラー: らせんの交差に失敗しました。</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureHelix.cpp" line="317"/>
      <source>Error: Subtracting the helix failed</source>
      <translation>エラー: らせんの減算に失敗しました。</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureHelix.cpp" line="340"/>
      <source>Error: Could not create face from sketch</source>
      <translation>エラー: スケッチから面を作成できませんでした。</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureHole.cpp" line="1389"/>
      <source>Thread type is invalid</source>
      <translation type="unfinished">Thread type is invalid</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureHole.cpp" line="1909"/>
      <source>Hole error: Unsupported length specification</source>
      <translation>ホールエラー: サポートされていない長さ指定です。</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureHole.cpp" line="1912"/>
      <source>Hole error: Invalid hole depth</source>
      <translation>ホールエラー: 穴の深さが正しくありません。</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureHole.cpp" line="1935"/>
      <source>Hole error: Invalid taper angle</source>
      <translation>ホールエラー: テーパー角度が正しくありません。</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureHole.cpp" line="1956"/>
      <source>Hole error: Hole cut diameter too small</source>
      <translation>ホールエラー: ホールカット直径が小さすぎます。</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureHole.cpp" line="1960"/>
      <source>Hole error: Hole cut depth must be less than hole depth</source>
      <translation>ホールエラー: ホールカット深さは穴の深さより小さくなければなりません。</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureHole.cpp" line="1964"/>
      <source>Hole error: Hole cut depth must be greater or equal to zero</source>
      <translation>ホールエラー: ホールカットの深さはゼロ以上でなければなりません。</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureHole.cpp" line="1986"/>
      <source>Hole error: Invalid countersink</source>
      <translation>ホールエラー: 皿穴が正しくありません。</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureHole.cpp" line="2019"/>
      <source>Hole error: Invalid drill point angle</source>
      <translation>ホールエラー: 錐先角度が正しくありません。</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureHole.cpp" line="2029"/>
      <source>Hole error: Invalid drill point</source>
      <translation>ホールエラー: 錐先が正しくありません。</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureHole.cpp" line="2063"/>
      <source>Hole error: Could not revolve sketch</source>
      <translation>ホールエラー: スケッチを回転できませんでした。</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureHole.cpp" line="2067"/>
      <source>Hole error: Resulting shape is empty</source>
      <translation>ホールエラー: 結果シェイプが空です。</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureHole.cpp" line="2077"/>
      <source>Error: Adding the thread failed</source>
      <translation>エラー: ねじ山の追加に失敗しました。</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureHole.cpp" line="2128"/>
      <location filename="../../../App/FeatureHole.cpp" line="2133"/>
      <source>Boolean operation failed on profile Edge</source>
      <translation>プロファイルエッジでブーリアン演算に失敗</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureHole.cpp" line="2139"/>
      <source>Boolean operation produced non-solid on profile Edge</source>
      <translation>ブーリアン演算によってプロファイルエッジ上で非ソリッドが生成</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureBoolean.cpp" line="156"/>
      <source>Boolean operation failed</source>
      <translation>ブーリアン演算が失敗しました。</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureHole.cpp" line="2160"/>
      <source>Could not create face from sketch.
Intersecting sketch entities or multiple faces in a sketch are not allowed for making a pocket up to a face.</source>
      <translation>スケッチから面を作成できませんでした。
スケッチ内の交差するスケッチ図形や複数面では、面までのポケットは作れません。</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureHole.cpp" line="2294"/>
      <source>Thread type out of range</source>
      <translation>ねじ山の種類が範囲外</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureHole.cpp" line="2297"/>
      <source>Thread size out of range</source>
      <translation>ねじ山のサイズが範囲外</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureHole.cpp" line="2447"/>
      <source>Error: Thread could not be built</source>
      <translation>エラー: ねじ山を作成できませんでした。</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureLoft.cpp" line="147"/>
      <source>Loft: At least one section is needed</source>
      <translation>ロフト: 少なくとも1つのセクションが必要です。</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureLoft.cpp" line="283"/>
      <source>Loft: A fatal error occurred when making the loft</source>
      <translation>ロフト: ロフト作成中に重大なエラーが発生しました。</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureLoft.cpp" line="184"/>
      <source>Loft: Creating a face from sketch failed</source>
      <translation>ロフト: スケッチから面を作成できませんでした。</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureLoft.cpp" line="217"/>
      <source>Loft: Failed to create shell</source>
      <translation>ロフト: シェルの作成に失敗しました。</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureExtrude.cpp" line="850"/>
      <source>Could not create face from sketch.
Intersecting sketch entities or multiple faces in a sketch are not allowed.</source>
      <translation>スケッチから面を作成できませんでした。
スケッチ内のスケッチ図形や複数面を交差させることはできません。</translation>
    </message>
    <message>
      <location filename="../../../App/FeaturePipe.cpp" line="178"/>
      <source>Pipe: Could not obtain profile shape</source>
      <translation>パイプ: プロファイル形状を取得できませんでした。</translation>
    </message>
    <message>
      <location filename="../../../App/FeaturePipe.cpp" line="183"/>
      <source>No spine linked</source>
      <translation>スパインがリンクされていません。</translation>
    </message>
    <message>
      <location filename="../../../App/FeaturePipe.cpp" line="196"/>
      <source>No auxiliary spine linked.</source>
      <translation>補助スパインがリンクされていません。</translation>
    </message>
    <message>
      <location filename="../../../App/FeaturePipe.cpp" line="217"/>
      <source>Pipe: Only one isolated point is needed if using a sketch with isolated points for section</source>
      <translation>パイプ: セクションに孤立点を持つスケッチを使用する場合、孤立点が1つだけである必要があります。</translation>
    </message>
    <message>
      <location filename="../../../App/FeaturePipe.cpp" line="223"/>
      <source>Pipe: At least one section is needed when using a single point for profile</source>
      <translation>パイプ: プロファイルに1点を使用する場合、少なくとも1つのセクションが必要です。</translation>
    </message>
    <message>
      <location filename="../../../App/FeaturePipe.cpp" line="237"/>
      <source>Pipe: All sections need to be part features</source>
      <translation>パイプ: すべてのセクションがパートフィーチャーである必要があります。</translation>
    </message>
    <message>
      <location filename="../../../App/FeaturePipe.cpp" line="243"/>
      <source>Pipe: Could not obtain section shape</source>
      <translation>パイプ: セクション形状を取得できませんでした。</translation>
    </message>
    <message>
      <location filename="../../../App/FeaturePipe.cpp" line="252"/>
      <source>Pipe: Only the profile and last section can be vertices</source>
      <translation>パイプ: プロファイルと最後のセクションにだけ頂点を配置できます。</translation>
    </message>
    <message>
      <location filename="../../../App/FeaturePipe.cpp" line="261"/>
      <source>Multisections need to have the same amount of inner wires as the base section</source>
      <translation>複数セクションは、基本セクションと同じ量の内部ワイヤーを持つ必要があります。</translation>
    </message>
    <message>
      <location filename="../../../App/FeaturePipe.cpp" line="288"/>
      <source>Path must not be a null shape</source>
      <translation>パスは null シェイプであってはなりません。</translation>
    </message>
    <message>
      <location filename="../../../App/FeaturePipe.cpp" line="323"/>
      <source>Pipe could not be built</source>
      <translation>パイプを作成できませんでした。</translation>
    </message>
    <message>
      <location filename="../../../App/FeaturePipe.cpp" line="368"/>
      <source>Result is not a solid</source>
      <translation>結果はソリッドではありません。</translation>
    </message>
    <message>
      <location filename="../../../App/FeaturePipe.cpp" line="383"/>
      <source>Pipe: There is nothing to subtract from</source>
      <translation>パイプ: 次のものから減算する対象がありません。</translation>
    </message>
    <message>
      <location filename="../../../App/FeaturePipe.cpp" line="396"/>
      <source>Adding the pipe failed</source>
      <translation>パイプの加算に失敗しました。</translation>
    </message>
    <message>
      <location filename="../../../App/FeaturePipe.cpp" line="418"/>
      <source>Subtracting the pipe failed</source>
      <translation>パイプの減算に失敗しました。</translation>
    </message>
    <message>
      <location filename="../../../App/FeaturePipe.cpp" line="444"/>
      <source>A fatal error occurred when making the pipe</source>
      <translation>パイプ作成中に重大なエラーが発生しました。</translation>
    </message>
    <message>
      <location filename="../../../App/FeaturePipe.cpp" line="567"/>
      <source>Invalid element in spine.</source>
      <translation>スパインの要素が正しくありません。</translation>
    </message>
    <message>
      <location filename="../../../App/FeaturePipe.cpp" line="570"/>
      <source>Element in spine is neither an edge nor a wire.</source>
      <translation>スパインの要素がエッジでもワイヤーでもありません。</translation>
    </message>
    <message>
      <location filename="../../../App/FeaturePipe.cpp" line="583"/>
      <source>Spine is not connected.</source>
      <translation>スパインが接続されていません。</translation>
    </message>
    <message>
      <location filename="../../../App/FeaturePipe.cpp" line="587"/>
      <source>Spine is neither an edge nor a wire.</source>
      <translation>スパインがエッジでもワイヤーでもありません。</translation>
    </message>
    <message>
      <location filename="../../../App/FeaturePipe.cpp" line="591"/>
      <source>Invalid spine.</source>
      <translation>スパインが正しくありません。</translation>
    </message>
    <message>
      <location filename="../../../App/FeaturePrimitive.cpp" line="98"/>
      <source>Cannot subtract primitive feature without base feature</source>
      <translation>ベースフィーチャー無しでプリミティブフィーチャーを減算することはできません。</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureLoft.cpp" line="253"/>
      <location filename="../../../App/FeaturePrimitive.cpp" line="116"/>
      <source>Unknown operation type</source>
      <translation>未知のオペレーション・タイプです。</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureLoft.cpp" line="259"/>
      <location filename="../../../App/FeaturePrimitive.cpp" line="123"/>
      <source>Failed to perform boolean operation</source>
      <translation>ブール演算の実行に失敗しました。</translation>
    </message>
    <message>
      <location filename="../../../App/FeaturePrimitive.cpp" line="203"/>
      <source>Length of box too small</source>
      <translation>直方体の厚みが小さすぎます。</translation>
    </message>
    <message>
      <location filename="../../../App/FeaturePrimitive.cpp" line="205"/>
      <source>Width of box too small</source>
      <translation>直方体の幅が小さすぎます。</translation>
    </message>
    <message>
      <location filename="../../../App/FeaturePrimitive.cpp" line="207"/>
      <source>Height of box too small</source>
      <translation>直方体の高さが小さすぎます。</translation>
    </message>
    <message>
      <location filename="../../../App/FeaturePrimitive.cpp" line="253"/>
      <source>Radius of cylinder too small</source>
      <translation>円筒の半径が小さすぎます</translation>
    </message>
    <message>
      <location filename="../../../App/FeaturePrimitive.cpp" line="255"/>
      <source>Height of cylinder too small</source>
      <translation>円筒の高さが小さすぎます</translation>
    </message>
    <message>
      <location filename="../../../App/FeaturePrimitive.cpp" line="257"/>
      <source>Rotation angle of cylinder too small</source>
      <translation>円筒の回転角が小さすぎます</translation>
    </message>
    <message>
      <location filename="../../../App/FeaturePrimitive.cpp" line="310"/>
      <source>Radius of sphere too small</source>
      <translation>球の半径が小さすぎます</translation>
    </message>
    <message>
      <location filename="../../../App/FeaturePrimitive.cpp" line="359"/>
      <location filename="../../../App/FeaturePrimitive.cpp" line="361"/>
      <source>Radius of cone cannot be negative</source>
      <translation>円錐の半径を負の値にすることはできません</translation>
    </message>
    <message>
      <location filename="../../../App/FeaturePrimitive.cpp" line="363"/>
      <source>Height of cone too small</source>
      <translation>円錐の高さが小さすぎます</translation>
    </message>
    <message>
      <location filename="../../../App/FeaturePrimitive.cpp" line="426"/>
      <location filename="../../../App/FeaturePrimitive.cpp" line="428"/>
      <source>Radius of ellipsoid too small</source>
      <translation>楕円体の半径が小さすぎます</translation>
    </message>
    <message>
      <location filename="../../../App/FeaturePrimitive.cpp" line="510"/>
      <location filename="../../../App/FeaturePrimitive.cpp" line="512"/>
      <source>Radius of torus too small</source>
      <translation>トーラスの半径が小さすぎます</translation>
    </message>
    <message>
      <location filename="../../../App/FeaturePrimitive.cpp" line="575"/>
      <source>Polygon of prism is invalid, must have 3 or more sides</source>
      <translation>角柱を作る多角形は3つ以上の辺を持たなければならず、正しくありません。</translation>
    </message>
    <message>
      <location filename="../../../App/FeaturePrimitive.cpp" line="577"/>
      <source>Circumradius of the polygon, of the prism, is too small</source>
      <translation>角柱を作る多角形の外接円が小さすぎます。</translation>
    </message>
    <message>
      <location filename="../../../App/FeaturePrimitive.cpp" line="579"/>
      <source>Height of prism is too small</source>
      <translation>角柱の高さが小さすぎます。</translation>
    </message>
    <message>
      <location filename="../../../App/FeaturePrimitive.cpp" line="660"/>
      <source>delta x of wedge too small</source>
      <translation>ウェッジのΔxが小さすぎます。</translation>
    </message>
    <message>
      <location filename="../../../App/FeaturePrimitive.cpp" line="663"/>
      <source>delta y of wedge too small</source>
      <translation>ウェッジのΔyが小さすぎます。</translation>
    </message>
    <message>
      <location filename="../../../App/FeaturePrimitive.cpp" line="666"/>
      <source>delta z of wedge too small</source>
      <translation>ウェッジのΔzが小さすぎます。</translation>
    </message>
    <message>
      <location filename="../../../App/FeaturePrimitive.cpp" line="669"/>
      <source>delta z2 of wedge is negative</source>
      <translation>ウェッジのΔz2が小さすぎます。</translation>
    </message>
    <message>
      <location filename="../../../App/FeaturePrimitive.cpp" line="672"/>
      <source>delta x2 of wedge is negative</source>
      <translation>ウェッジのΔx2が小さすぎます。</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureRevolution.cpp" line="91"/>
      <source>Angle of revolution too large</source>
      <translation>回転押し出しの角度が大きすぎます。</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureRevolution.cpp" line="97"/>
      <source>Angle of revolution too small</source>
      <translation>回転押し出しの角度が小さすぎます。</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureRevolution.cpp" line="129"/>
      <source>Reference axis is invalid</source>
      <translation>参照軸が無効です。</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureExtrude.cpp" line="800"/>
      <source>Fusion with base feature failed</source>
      <translation>ベースフィーチャーとの結合に失敗しました。</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureTransformed.cpp" line="100"/>
      <source>Transformation feature Linked object is not a Part object</source>
      <translation>変換フィーチャーのリンク・オブジェクトはパートオブジェクトではありません。</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureTransformed.cpp" line="105"/>
      <source>No originals linked to the transformed feature.</source>
      <translation>変換されたフィーチャーにリンク元がありません。</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureTransformed.cpp" line="265"/>
      <source>Cannot transform invalid support shape</source>
      <translation>無効なサポートシェイプを変換できません</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureTransformed.cpp" line="311"/>
      <source>Shape of additive/subtractive feature is empty</source>
      <translation>加算/減算フィーチャーのシェイプが空です。</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureTransformed.cpp" line="303"/>
      <source>Only additive and subtractive features can be transformed</source>
      <translation>加算および減算フィーチャーのみ変換できます。</translation>
    </message>
    <message>
      <location filename="../../../App/FeatureThickness.cpp" line="103"/>
      <source>Invalid face reference</source>
      <translation>無効な面参照です。</translation>
    </message>
  </context>
  <context>
    <name>PartDesignGui::ViewProviderBody</name>
    <message>
      <location filename="../../ViewProviderBody.cpp" line="121"/>
      <source>Active body</source>
      <translation>アクティブなボディー</translation>
    </message>
  </context>
  <context>
    <name>CmdPartDesignCompDatums</name>
    <message>
      <location filename="../../Command.cpp" line="2382"/>
      <source>Create datum</source>
      <translation>データムを作成</translation>
    </message>
    <message>
      <location filename="../../Command.cpp" line="2383"/>
      <source>Create a datum object or local coordinate system</source>
      <translation>データムオブジェクトまたはローカル座標系を作成</translation>
    </message>
  </context>
  <context>
    <name>CmdPartDesignCompSketches</name>
    <message>
      <location filename="../../Command.cpp" line="2417"/>
      <source>Create datum</source>
      <translation>データムを作成</translation>
    </message>
    <message>
      <location filename="../../Command.cpp" line="2418"/>
      <source>Create a datum object or local coordinate system</source>
      <translation>データムオブジェクトまたはローカル座標系を作成</translation>
    </message>
  </context>
  <context>
    <name>PartDesignGui::TaskDlgRevolutionParameters</name>
    <message>
      <location filename="../../TaskRevolutionParameters.cpp" line="715"/>
      <source>Revolution parameters</source>
      <translation>回転押し出しパラメーター</translation>
    </message>
  </context>
  <context>
    <name>PartDesignGui::TaskDlgGrooveParameters</name>
    <message>
      <location filename="../../TaskRevolutionParameters.cpp" line="722"/>
      <source>Groove parameters</source>
      <translation>グルーブパラメーター</translation>
    </message>
  </context>
</TS>
